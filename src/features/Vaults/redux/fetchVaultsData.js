import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import BigNumber from 'bignumber.js';
import {
  VAULT_FETCH_VAULTS_DATA_BEGIN,
  VAULT_FETCH_VAULTS_DATA_SUCCESS,
  VAULT_FETCH_VAULTS_DATA_FAILURE,
} from './constants';
import { fetchPrice, whenPricesLoaded } from 'libs/web3';
import { vaultABI } from 'libs/config';
import { byDecimals } from 'libs/helpers/bignumber';
import Web3 from 'web3';
import { getRpcUrl } from 'libs/helpers/networkSetup';

function fakeMultiCall(actions){
    return new Promise((resolve, reject) => {
        Promise.all(Object.values(actions).map(item => item.call())).then(res =>  {
            let formatted = {};
            res.forEach((x,i) => {
              formatted[Object.keys(actions)[i]] = x;
            })
            resolve(formatted);
        }).catch(e => {
            reject(e);
        })

    })
}

export function fetchVaultsData({ web3, pools }) {
  return dispatch => {
    dispatch({
      type: VAULT_FETCH_VAULTS_DATA_BEGIN,
    });

    if (!web3) {
      // setup default provider to get vault data
      web3 = new Web3(new Web3.providers.HttpProvider(getRpcUrl()));
    }

    const promise = new Promise((resolve, reject) => {


      const vaultCalls = pools.map(pool => {
        const vault = new web3.eth.Contract(vaultABI, pool.earnedTokenAddress);
        return {
          pricePerFullShare: vault.methods.getPricePerFullShare(),
          tvl: vault.methods.balance(),
        };
      });

      Promise.all([
        Promise.all(vaultCalls.map(item => fakeMultiCall(item))).then(result => result),
        whenPricesLoaded(), // need to wait until prices are loaded in cache
      ])
        .then(data => {
          //console.log('data',data);
          const newPools = pools.map((pool, i) => {
            const pricePerFullShare = byDecimals(data[0][i].pricePerFullShare, 18).toNumber();
            return {
              pricePerFullShare: new BigNumber(pricePerFullShare).toNumber() || 1,
              tvl: byDecimals(data[0][i].tvl, pool.tokenDecimals).toNumber(),
              oraclePrice: fetchPrice({ id: pool.oracleId }) || 0,
            };
          });
          dispatch({
            type: VAULT_FETCH_VAULTS_DATA_SUCCESS,
            data: newPools,
          });
          resolve();
        })
        .catch(error => {
          dispatch({
            type: VAULT_FETCH_VAULTS_DATA_FAILURE,
          });
          reject(error.message || error);
        });
    });

    return promise;
  };
}

export function useFetchVaultsData() {
  const dispatch = useDispatch();

  const { pools, fetchVaultsDataDone } = useSelector(
    state => ({
      pools: state.vault.pools,
      fetchVaultsData: state.vault.fetchVaultsData,
      fetchVaultsDataDone: state.vault.fetchVaultsDataDone,
    }),
    shallowEqual
  );

  const boundAction = useCallback(
    data => {
      return dispatch(fetchVaultsData(data));
    },
    [dispatch]
  );

  return {
    pools,
    fetchVaultsData: boundAction,
    fetchVaultsDataDone,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_VAULTS_DATA_BEGIN:
      return {
        ...state,
        fetchVaultsDataPending: true,
      };

    case VAULT_FETCH_VAULTS_DATA_SUCCESS:
      const pools = state.pools.map((pool, i) => ({
        ...pool,
        ...action.data[i],
      }));

      return {
        ...state,
        pools,
        fetchVaultsDataPending: false,
        fetchVaultsDataDone: true,
      };

    case VAULT_FETCH_VAULTS_DATA_FAILURE:
      return {
        ...state,
        fetchVaultsDataPending: false,
      };

    default:
      return state;
  }
}
