import initialState from './initialState';
import { reducer as fetchBalancesReducer } from './fetchBalances';
import { reducer as fetchApysReducer } from './fetchApys';
import { reducer as fetchPendingPLFYReducer } from './fetchPendingPLFY';
import { reducer as fetchVaultsDataReducer } from './fetchVaultsData';
import { reducer as fetchWithdrawReducer } from './fetchWithdraw';
import { reducer as fetchDepositReducer } from './fetchDeposit';
import { reducer as fetchApprovalReducer } from './fetchApproval';
import { reducer as fetchHarvestReducer } from './fetchHarvest';
import { reducer as fetchHarvestAllReducer } from './fetchHarvestAll';
import { reducer as fetchZapDepositReducer } from './fetchZapDeposit';
import { reducer as fetchZapEstimateReducer } from './fetchZapEstimate';


const reducers = [
  fetchVaultsDataReducer,
  fetchApprovalReducer,
  fetchDepositReducer,
  fetchWithdrawReducer,
  fetchApysReducer,
  fetchPendingPLFYReducer,
  fetchZapEstimateReducer,
  fetchBalancesReducer,
  fetchHarvestReducer,
  fetchHarvestAllReducer
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
