import React,{useEffect} from 'react';
import {
  Box,
  Flex,
  Heading,
  Stack
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
import { useFetchBalances, useFetchVaultsData, useFetchApys } from './redux/hooks';



const FETCH_INTERVAL_MS = 15 * 1000;


export default function() {
  const oneLineMode = useBreakpointValue({ base: false, xl: true });

  /** Vaults informations **/

  const { connectWallet, web3, address, networkId, connected } = useConnectWallet();
  const { pools, fetchVaultsData, fetchVaultsDataPending, fetchVaultsDataDone } = useFetchVaultsData();
  const { tokens,tokenBalance, fetchBalances, fetchBalancesPending, fetchBalancesDone } = useFetchBalances();
  const { apys, fetchApys, fetchApysDone } = useFetchApys();


  useEffect(() => {
    fetchApys();
    console.log('apys',apys);
    const id = setInterval(fetchApys, FETCH_INTERVAL_MS);
    return () => clearInterval(id);
  }, [fetchApys]);

  useEffect(() => {
    const fetch = () => {
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
  }, [address, web3, fetchBalances, fetchVaultsData]);


  return (
    <PageLayout 
      header={
        <Header
            title={
                <>
                    <Flex spacing="20px" justifyItems={'center'} justifyContent={'space-between'}>
                        <Heading size={'4xl'} color={'gray.600'}> Vaults </Heading>
                        {/* <NetworksToggle></NetworksToggle> */}
                        <AllRewards />
                    </Flex>
                </>
            }
            subtitle=""
        />
      }
      body={
        <Stack w="100%">
            <Filters />
            <Box h="10px" />
            <Vaults 
              vaults={pools}
              tokens={tokens}
              apys={apys}
              fetchBalancesDone={fetchBalancesDone}
              fetchVaultsDataDone={fetchVaultsDataDone}
              fetchApysDone={fetchApysDone}
            />
        </Stack>
      }
    />
  );
}