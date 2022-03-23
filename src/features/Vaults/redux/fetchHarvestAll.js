import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  VAULT_FETCH_STRATEGY_HARVEST_BEGIN,
  VAULT_FETCH_STRATEGY_HARVEST_SUCCESS,
  VAULT_FETCH_STRATEGY_HARVEST_FAILURE,
} from './constants';
import { harvestAll } from 'libs/web3';

export function fetchHarvestAll({address,web3, vaults, DisplayNotification,toadId  }) {
    const index = new Date().getTime() + Math.random();
    return dispatch => {
        dispatch({
            type: VAULT_FETCH_STRATEGY_HARVEST_BEGIN,
            index,
        });

        const promise = new Promise((resolve, reject) => {
            harvestAll({address,web3, vaults, DisplayNotification,toadId })
            .then(data => {
                dispatch({
                    type: VAULT_FETCH_STRATEGY_HARVEST_SUCCESS,
                    data,
                    index,
                });
                resolve(data);
            })
            .catch(error => {
                dispatch({
                    type: VAULT_FETCH_STRATEGY_HARVEST_FAILURE,
                    index,
                });
                reject(error.message || error);
            });
        });
        return promise;
    };
}

export function useFetchHarvestAll() {
  const dispatch = useDispatch();

  const { fetchHarvestPending } = useSelector(state => ({
    fetchHarvestPending: state.vault.fetchHarvestPending,
  }));

  const boundAction = useCallback(data => dispatch(fetchHarvestAll(data)), [dispatch]);

  return {
    fetchHarvestAll: boundAction,
    fetchHarvestPending,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_STRATEGY_HARVEST_BEGIN:
      return {
        ...state,
        fetchHarvestPending: {
          ...state.fetchHarvestPending,
          [action.index]: true,
        },
      };

    case VAULT_FETCH_STRATEGY_HARVEST_SUCCESS:
      return {
        ...state,
        fetchHarvestPending: {
          ...state.fetchHarvestPending,
          [action.index]: false,
        },
      };

    case VAULT_FETCH_STRATEGY_HARVEST_FAILURE:
      return {
        ...state,
        fetchHarvestPending: {
          ...state.fetchHarvestPending,
          [action.index]: false,
        },
      };

    default:
      return state;
  }
}
