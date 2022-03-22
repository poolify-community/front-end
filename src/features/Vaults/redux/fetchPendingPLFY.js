import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
    VAULT_FETCH_PENDING_PLFY_BEGIN,
    VAULT_FETCH_PENDING_PLFY_SUCCESS,
    VAULT_FETCH_PENDING_PLFY_FAILURE,
} from './constants';

import { apiUrl, getApiCacheBuster } from 'libs/helpers/getApiInfo';

export function fetchPendingPLFY() {
  return dispatch => {
    dispatch({
      type: VAULT_FETCH_PENDING_PLFY_BEGIN,
    });

    return new Promise((resolve, reject) => {
      const cacheBuster = getApiCacheBuster();
      const doRequest = axios.get(`${apiUrl}/pending-rewards?_=${cacheBuster}`);

      doRequest.then(
        res => {
          dispatch({
            type: VAULT_FETCH_PENDING_PLFY_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: VAULT_FETCH_PENDING_PLFY_FAILURE,
            data: { error: err },
          });
          reject(err);
        }
      );
    });
  };
}

export function useFetchPendingPLFY() {
  const dispatch = useDispatch();

  const { pendingPLFY, fetchPendingPLFYPending, fetchPendingPLFYDone } = useSelector(
    state => ({
      pendingPLFY: state.vault.pendingPLFY,
      fetchPendingPLFYDone: state.vault.fetchPendingPLFYDone,
      fetchPendingPLFYPending: state.vault.fetchPendingPLFYPending,
    }),
    shallowEqual
  );

  const boundAction = useCallback(() => {
    dispatch(fetchPendingPLFY());
  }, [dispatch]);

  return {
    pendingPLFY,
    fetchPendingPLFY: boundAction,
    fetchPendingPLFYDone,
    fetchPendingPLFYPending,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_PENDING_PLFY_BEGIN:
      return {
        ...state,
        fetchPendingPLFYPending: true,
      };

    case VAULT_FETCH_PENDING_PLFY_SUCCESS:
      return {
        ...state,
        pendingPLFY: action.data,
        fetchPendingPLFYDone: true,
        fetchPendingPLFYPending: false,
      };

    case VAULT_FETCH_PENDING_PLFY_FAILURE:
      return {
        ...state,
        fetchPendingPLFYPending: false,
      };

    default:
      return state;
  }
}
