import {
  Flex,
  HStack,
  Spacer,
  Grid,
  Divider,
  AccordionButton,AccordionIcon,AccordionPanel,AccordionItem
} from "@chakra-ui/react";
import { useBreakpointValue } from '@chakra-ui/media-query';


import CustomCard from 'components/CustomCard/CustomCard';
import CardTagContainer from 'components/CardTag/CardTagContainer';
import CardTag from 'components/CardTag/CardTag';



import VaultSummary from 'features/Vaults/components/VaultSummary/VaultSummary';
import VaultDetails from 'features/Vaults/components/VaultDetails/VaultDetails';

import { useConnectWallet } from 'libs/hooks/useConnector';
import TitleSection from "../VaultSummary/TitleSection";


export default function Vault({vault,tokens,apys,fetchBalancesDone,fetchVaultsDataDone,fetchApysDone, ...props }) {
    const isOneLineMode = useBreakpointValue({ base: false, lg: true });
    const { connectWallet, web3, address, networkId, connected } = useConnectWallet();
    const shouldExpand = connected || !isOneLineMode;
    //console.log('isOneLineMode',isOneLineMode);

    const DetailsButton = (
        <>
            <AccordionButton
                color="secondary.500"
                w="unset"
                className={""}
                fontSize="12px !important"
                ml={isOneLineMode ? 'undefined' : '-15px !important'}
            >
                <AccordionIcon />
            </AccordionButton>
        </>
    );


    return (
      <CustomCard
        {...props}
        position="relative"
        overflow={'inherit'}
        border={'0'}
        borderColor={'secondary.300'}
      >
        <CardTagContainer>
            {address && vault.isPoolifyStaking && !vault.depositsPaused && (
                <CardTag variant="information" text="AUTO STAKE" />
            )}

            {address && vault.depositsPaused && (
                <CardTag variant="warning" text="Paused vault" />
            )}
        </CardTagContainer>


        <AccordionItem border="0">
            <HStack py="24px" spacing="0" minW="">
                
                <TitleSection vault={vault}/>
                <Spacer />
                <>
                    <Grid templateColumns={isOneLineMode?'1fr 1fr 1fr 1fr 1fr':'1fr 1fr'} 
                            gap={isOneLineMode?'1rem':'0.5rem'}
                            lineHeight={'1rem'} 
                    >
                        <VaultSummary 
                            vault={vault}
                            tokens={tokens}
                            apys={apys}
                            fetchVaultsDataDone={fetchVaultsDataDone}
                            fetchBalancesDone={fetchBalancesDone}
                            fetchApysDone={fetchApysDone}
                        />
                    </Grid>
                    {DetailsButton}
                </>
            </HStack>
            {shouldExpand && (
                <AccordionPanel p={{'sm':"12px 0px 28px 0px",'base':"12px 30px 28px 40px"}}>
                {connected && (
                    <>
                        <Divider mt="14px" mb="26px" />
                        <Flex justifyContent={'center'} flexDirection={isOneLineMode?'row':'column'}>
                            <VaultDetails 
                                vault={vault}
                                tokens={tokens}
                                apys={apys}
                                fetchVaultsDataDone={fetchVaultsDataDone}
                                fetchBalancesDone={fetchBalancesDone}
                                fetchApysDone={fetchApysDone}
                            />
                        </Flex>
                    </>
                )}
              </AccordionPanel>
            )}
        </AccordionItem>
      </CustomCard>
  );
}
  
