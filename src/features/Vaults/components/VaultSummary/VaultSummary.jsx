/* eslint-disable import/no-anonymous-default-export */

import {
    Spacer,
    Grid,
    useBreakpointValue
} from "@chakra-ui/react";
import BigNumber from 'bignumber.js';
import { useFetchBalances,useFetchWithdraw,useFetchZapEstimate } from 'features/Vaults/redux/hooks';
import { formatTvl } from 'libs/helpers/format';
import { byDecimals } from 'libs/helpers/bignumber';

import APYStats from "./APYStats";
import DepositedStats from "./DepositedStats";
import TVLStats from "./TVLStats";
import WalletStats from "./WalletStats";


const formatDecimals = number => {
  return number >= 10 ? number.toFixed(4) : number.isEqualTo(0) ? 0 : number.toFixed(8);
};



export default function({vault,tokens,apys,fetchBalancesDone,fetchVaultsDataDone,fetchApysDone,...props}){
    const isOneLineMode = useBreakpointValue({ base: false, lg: true });
    const { tokenBalance } = useFetchBalances();

    console.log('tokens[vault.vaultToken]',tokens[vault.vaultToken]);

    const balance   = byDecimals(tokens[vault.token].tokenBalance, vault.tokenDecimals);
    const deposited = byDecimals(
      new BigNumber(tokens[vault.vaultToken].tokenBalance).multipliedBy(new BigNumber(vault.isPoolifyStaking?vault.pricePerFullShare:1)),
      vault.tokenDecimals
    );

    const apy = apys[vault.id] || { totalApy: 0 };
    //console.log('apy',apy);

    const balanceUsd    = balance   > 0 && fetchVaultsDataDone ? formatTvl(balance, vault.oraclePrice) : '';
    const depositedUsd  = deposited > 0 && fetchVaultsDataDone ? formatTvl(deposited, vault.oraclePrice, false) : '';
    // { sm:'320px', base: '750px', xl: '1200px' }
      //console.log('deposited',deposited);
    return (
      <>
        
        <DepositedStats value={deposited.toFormat(deposited.gt(1) ? 0 : 4)} valueUsd={depositedUsd}/>
        {isOneLineMode && (
          <>
            <WalletStats value={balance.toFormat(balance.gt(1) ? 0 : 4)} valueUsd={balanceUsd}/>
            <APYStats apy={apy}/>
            <TVLStats value={formatTvl(vault.tvl, vault.oraclePrice)}/>
          </>
        )}
        
      </>
    )
}