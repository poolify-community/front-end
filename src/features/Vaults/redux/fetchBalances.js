import BigNumber from 'bignumber.js';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  VAULT_FETCH_BALANCES_BEGIN,
  VAULT_FETCH_BALANCES_SUCCESS,
  VAULT_FETCH_BALANCES_FAILURE,
} from './constants';

import { erc20ABI} from 'libs/config';
import { byDecimals } from 'libs/helpers/bignumber';
import {fetchBalance,fetchAllowance} from "libs/web3";

// TODO: Replace with Multi Call

export function fetchBalances({ address, web3, tokens }) {
  console.log('fetchBalances',fetchBalances);
  return dispatch => {
    if (!(address && web3)) return;

    dispatch({
      type: VAULT_FETCH_BALANCES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
        var actions_balances = [];
        var actions_allowances = [];

        Object.entries(tokens).forEach(([symbol, token]) => {
            const tokenContract = new web3.eth.Contract(erc20ABI, token.tokenAddress);

            actions_balances.push({
              type:'balance',
              balance: tokenContract.methods.balanceOf(address),
              symbol: symbol,
            });

            Object.entries(token.allowance).forEach(([spender]) => {
              actions_allowances.push({
                type:'allowance',
                allowance: tokenContract.methods.allowance(address, spender),
                spender: spender,
                symbol: symbol,
              });
            });
        })

        let actions = actions_balances.concat(actions_allowances);
        Promise.all(actions.map(async (action) => {
          switch(action.type){
            case 'balance':
              var balance = await action.balance.call({ from: address });
              return {
                type:'balance',
                symbol:action.symbol,
                balance:balance
              }
            break;
            case 'allowance':
              var allowance = await action.allowance.call({ from: address });
              return {
                type:'allowance',
                symbol:action.symbol,
                spender:action.spender,
                allowance:allowance
              }
            break;
          }
          
         
        }))
        .then(results => {
            var balanceResults = [];
            var allowanceResults = [];
            results.forEach(res => {
                if(res.type == 'balance'){
                  balanceResults.push(res);
                }else{
                  allowanceResults.push(res);
                }
            });

            console.log('balanceResults',balanceResults);
            //console.log('allowanceResults',allowanceResults);
            const newTokens = {};

            balanceResults.forEach(balanceResult => {
              newTokens[balanceResult.symbol] = {
                ...tokens[balanceResult.symbol],
                tokenBalance: balanceResult.balance,
              };
            });

            allowanceResults.forEach(allowanceResult => {
              newTokens[allowanceResult.symbol] = {
                ...newTokens[allowanceResult.symbol],
                allowance: {
                  ...newTokens[allowanceResult.symbol].allowance,
                  [allowanceResult.spender]: allowanceResult.allowance,
                },
              };
            });
            //console.log('newTokens 2 ',newTokens);
            dispatch({
                type: VAULT_FETCH_BALANCES_SUCCESS,
                data: newTokens,
            });
            resolve();
        })
        .catch(error => {
          dispatch({
            type: VAULT_FETCH_BALANCES_FAILURE,
          });
          return reject(error.message || error);
        });

    });

    return promise;
  };
}


export function useFetchBalances() {
  const dispatch = useDispatch();

  const { tokens, fetchBalancesPending, fetchBalancesDone } = useSelector(
    state => ({
      tokens: state.vault.tokens,
      fetchBalancesDone: state.vault.fetchBalancesDone,
      fetchBalancesPending: state.vault.fetchBalancesPending,
    }),
    shallowEqual
  );

  const boundAction = useCallback(
    data => {
      return dispatch(fetchBalances(data));
    },
    [dispatch]
  );

  const tokenBalance = tokenSymbol => {
    let res = byDecimals(tokens[tokenSymbol]?.tokenBalance || 0, tokens[tokenSymbol].decimals);
    console.log('tokens[tokenSymbol]',tokens[tokenSymbol],res.toFormat());
    return res
  };


  return {
    tokens,
    tokenBalance: tokenBalance,
    fetchBalances: boundAction,
    fetchBalancesDone,
    fetchBalancesPending,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_BALANCES_BEGIN:
      return {
        ...state,
        fetchBalancesPending: true,
      };

    case VAULT_FETCH_BALANCES_SUCCESS:
      const newAndUpdatedTokens = {};
      Object.entries(action.data).forEach(([symbol, token]) => {
        newAndUpdatedTokens[symbol] = {
          ...state.tokens[symbol],
          ...token,
          allowance: {
            ...state.tokens[symbol]?.allowance,
            ...token.allowance,
          },
        };
      });

      const formatted = {
        ...state,
        tokens: {
          ...state.tokens,
          ...newAndUpdatedTokens,
        },
        fetchBalancesDone: true,
        fetchBalancesPending: false,
      };
      console.log('formatted',formatted);
      console.log('newAndUpdatedTokens',newAndUpdatedTokens);

      return formatted;

    case VAULT_FETCH_BALANCES_FAILURE:
      return {
        ...state,
        fetchBalancesPending: false,
      };

    default:
      return state;
  }
}
