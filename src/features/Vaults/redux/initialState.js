import { getNetworkPools } from 'libs/helpers/getNetworkData';

const tokens = {};
const pools = getNetworkPools();

const zapMap = {};

pools.forEach(
  (
    {
      token,
      tokenDecimals,
      tokenAddress,
      vaultToken,
      vaultContractAddress,
      vaultTokenAddress,
      withdrawalFee,
      depositFee,
    },
    i
  ) => {
    if (!withdrawalFee) pools[i].withdrawalFee = '0.1%';
    if (!depositFee) pools[i].depositFee = '0%';

    /** Tokens (External) **/
    tokens[token] = {
      symbol: token,
      decimals: tokenDecimals,
      tokenAddress: tokenAddress,
      tokenBalance: 0,
      allowance: {
        ...tokens[token]?.allowance,
        [vaultContractAddress]: tokenAddress ? 0 : Infinity,
      },
    };

    /** Tokens (Internal, vault tokens) **/
    tokens[vaultToken] = {
      symbol: vaultToken,
      decimals: 18,
      tokenAddress: vaultTokenAddress,
      tokenBalance: 0,
      allowance: {
        [vaultContractAddress]: 0,
      },
    };
  }
);

const now = Date.now() / 1000;
const initialState = {
  pools,
  tokens,
  apys: {},
  bifibuyback: {},
  fetchApysDone: false,
  fetchApysPending: false,
  fetchVaultsDataDone: false,
  fetchVaultsDataPending: false,
  fetchBalancesDone: false,
  fetchBalancesPending: false,
  fetchBifibuybackDone: false,
  fetchBifibuybackPending: false,
  fetchApprovalPending: {},
  fetchDepositPending: {},
  fetchZapDepositPending: {},
  fetchWithdrawPending: {},
  fetchHarvestPending: {},
  fetchZapEstimatePending: {},

};

const allZaps = Object.keys(zapMap);
console.log('Total number of zaps: ' + allZaps.length.toString());
console.log('initialState',initialState)

export default initialState;
