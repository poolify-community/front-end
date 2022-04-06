import React,{useEffect} from 'react';
import {
  Box,
  Flex,
  Heading
} from '@chakra-ui/react';
import { useBreakpointValue } from '@chakra-ui/media-query';

// Layout + Header
import PageLayout from 'layouts/PageLayout';
import Header from 'components/Header/Header';


// Components 
import Vaults from 'features/Vaults/components/Vaults/Vaults';
import Filters from 'features/Vaults/components/Filters/Filters';
import AllRewards from 'features/Vaults/components/AllRewards/AllRewards';

import { useConnectWallet } from 'libs/hooks/useConnector';
import { useFetchBalances, useFetchVaultsData, useFetchApys,useFetchPendingPLFY } from './redux/hooks';



const FETCH_INTERVAL_MS = 15 * 1000;
const FETCH_INTERVAL_MS_FAST = 3 * 1000;


const VaultsComponent = function() {
  const isOneLineMode = useBreakpointValue({ base: false, lg: true });

  /** Vaults informations **/

  const { connectWallet, web3, address, networkId, connected } = useConnectWallet();
  const { pools, fetchVaultsData, fetchVaultsDataPending, fetchVaultsDataDone } = useFetchVaultsData();
  const { tokens,tokenBalance, fetchBalances, fetchBalancesPending, fetchBalancesDone } = useFetchBalances();
  const { apys, fetchApys, fetchApysDone } = useFetchApys();
  const { pendingPLFY, fetchPendingPLFY, fetchPendingPLFYDone } = useFetchPendingPLFY();

  useEffect(() => {
    const fetch = () => {
      fetchPendingPLFY();
    };
    fetch();

    const id = setInterval(fetch, FETCH_INTERVAL_MS_FAST);
    return () => clearInterval(id);

    // Adding tokens and pools to this dep list, causes an endless loop, DDoSing the api
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, web3,fetchPendingPLFY]);

  useEffect(() => {
    const fetch = () => {
      console.log('fetch ALL');
      if (address && web3) {
        console.log('fetchBalances');
        fetchBalances({ address, web3, tokens });
      }
      fetchVaultsData({ address, web3, pools });
      fetchApys();
    };
    fetch();

    const id = setInterval(fetch, FETCH_INTERVAL_MS);
    return () => clearInterval(id);

    // Adding tokens and pools to this dep list, causes an endless loop, DDoSing the api
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, web3,fetchApys,fetchBalances, fetchVaultsData]);


  return (
    <PageLayout 
      header={
        <Header
            title={
                <>
                    <Flex spacing="20px" justifyItems={'center'} justifyContent={'space-between'} 
                      flexDirection={isOneLineMode?'row':'column'}
                    >
                        <Heading size={'3xl'}  mb="15px"> Vaults </Heading>
                        {/* <NetworksToggle></NetworksToggle> */}
                        <AllRewards tokens={tokens} vaults={pools} pendingPLFY={pendingPLFY} fetchPendingPLFYDone={fetchPendingPLFYDone}/>
                    </Flex>
                </>
            }
            subtitle=""
        />
      }
      body={
        <Box maxWidth={'1200px'} >
            {/* <Filters /> */}
            <Box h="10px" />
            <Vaults 
              vaults={pools}
              tokens={tokens}
              apys={apys}
              pendingPLFY={pendingPLFY}
              fetchBalancesDone={fetchBalancesDone}
              fetchVaultsDataDone={fetchVaultsDataDone}
              fetchPendingPLFYDone={fetchPendingPLFYDone}
              fetchApysDone={fetchApysDone}
            />
        </Box>
      }
    />
  );
}

export default VaultsComponent;