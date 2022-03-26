import {
    Flex,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Accordion
} from "@chakra-ui/react";

//import {vaultConfigList} from 'config/vaults';
import Vault from 'features/Vaults/components/Vault/Vault';
import { useConnectWallet } from 'libs/hooks/useConnector';

export default function VaultList({vaults,tokens,apys,pendingPLFY,fetchBalancesDone,fetchVaultsDataDone,fetchApysDone,fetchPendingPLFYDone,...props}) {
        const { connectWallet, web3, address, networkId, connected } = useConnectWallet();
        const coreVaults = vaults.filter(item => item?.categories?.includes('core'));
        const partnerVaults = vaults.filter(item => item?.categories?.includes('partner'));
        
        /*
        const loadVaultInformations = (chainId) => {
            let _vaults = [];
            let config = vaultConfigList[parseInt(chainId)] || [];
                // Load data 
                // Process data
                config.forEach(item => {
                    _vaults.push({
                        user:{
                            deposited:'10000',
                            depositedInUsd:'1,450',
                            pendingRewards:'0',
                            pendingRewardsInUsd:'0'
                        },vaults
                                yearly:'40.00%',
                                daily:'0.0920%'
                            }
                        },
                        meta:{...item}
                    })
                })
            console.log('Formatted Vaults',_vaults);
            setVaults(_vaults);
        }

        useEffect(() => {
            if(chainId == null) return;
            console.info('---> trigger initPoolList',chainId,parseInt(chainId), account);
            loadVaultInformations(chainId);
        }, [chainId]);

         defaultIndex={[0]}
        */

        const _headingColor = useColorModeValue('tertiary.100', 'tertiary.600');

      return (
            <Accordion  allowMultiple={true} allowToggle={true} width={'inherit'}>
                <Flex margin="20px" justifyItems={'center'} justifyContent={'space-between'}>
                    <Heading size={'xl'} color={'black'}> Poolify Core </Heading>
                </Flex>
                {coreVaults.length > 0 ? (
                    coreVaults.map((vault, i) => (
                        <Vault key={i} mb="15px"
                            vault={vault}
                            tokens={tokens}
                            apys={apys}
                            fetchVaultsDataDone={fetchVaultsDataDone}
                            fetchBalancesDone={fetchBalancesDone}
                            fetchApysDone={fetchApysDone}
                        />
                    ))
                ) : (
                    <Center>
                        <Text
                            size="md"
                            fontStyle={'italic'}
                            color={_headingColor}
                        >
                            No vaults to display.
                        </Text>
                    </Center>
                )}

                <Flex margin="20px" justifyItems={'center'} justifyContent={'space-between'}>
                    <Heading size={'xl'} color={'black'}> Partners </Heading>
                </Flex>
                {partnerVaults.length > 0 ? (
                    partnerVaults.map((vault, i) => (
                        <Vault key={i} mb="15px"
                            vault={vault}
                            tokens={tokens}
                            apys={apys}
                            fetchVaultsDataDone={fetchVaultsDataDone}
                            fetchBalancesDone={fetchBalancesDone}
                            fetchApysDone={fetchApysDone}
                        />
                    ))
                ) : (
                    <Center>
                        <Text
                            size="md"
                            fontStyle={'italic'}
                            color={_headingColor}
                        >
                            No vaults to display.
                        </Text>
                    </Center>
                )}


            </Accordion>
      );
}
  
