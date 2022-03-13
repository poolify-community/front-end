import {
    Box,
    SimpleGrid,
    Img,
    Flex,
    Center,
    useColorModeValue,
    Heading,
    Accordion
} from "@chakra-ui/react";
import {useEffect,useState} from 'react';
import { useMoralis, useERC20Balances } from "react-moralis";
import Web3 from 'web3';


//import {vaultConfigList} from 'config/vaults';
import Vault from 'features/Vaults/components/Vault/Vault';

import { useConnectWallet } from 'libs/hooks/useConnector';

const itemList = [
    {
        data:{
            apr:[0.49081781112845635, 1.2270445278211408],
            capital: 981531.0459184108,
            currentTick: -108664,
            endBlock: 14409406,
            feeApr: 1.9553889709434809,
            isEnded: false,
            lockBoostMultiplier: 1,
            oraclePriceAByB: 0.0000191184491273851,
            oraclePriceAByBDecimal: 0.0000191184491273851,
            positionPoolContract: "0x3eb8224923774F668d6e722cdBF8b0F4E46DaE38",
            positionSqrtPriceX96: "346256408294048036204271117",
            positionTick: -108664,
            priceAByB: 0.000019100136550090317,
            priceAByBDecimal: 0.000019100136550090317,
            reward: [
                ['iZi', '9.722222222']
            ],
            rewardTokenPrice: [0.05499462551635962],
            rewardTokenSymbols: ['iZi'],
            secondsLeft: 2567684,
            tokenPriceADecimal: 0.05499462551635962,
            tokenPriceBDecimal: 2895.3685718451266,
            tokenPriceIZIDecimal: 0.05499462551635962,
            tokenPriceLockDecimal: 0.05499462551635962,
            tokenPriceUniDecimal: 2895.3685718451266,
            tokenUniWorth: 490765.5229592054,
            totalNIZI: 2.9889896868581063e+24,
            tvl: 1145909.4144194333,
            vLiquidity: 169500189969409000000,
            vLiquidityWorth: 490765.5229592054
        },
        meta:{
            allowStakeNFT: false,
            contractVersion: undefined,
            feeTier: 0.3,
            iZiBoost: true,
            initialToggle: false,
            lockBoost: false,
            miningContract: "0xbE138aD5D41FDc392AE0B61b09421987C1966CC3",
            noFee: true,
            positionPoolKey: "0x9ad37205d608b8b219e6a2573f922094cec5c200-0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2-0.3",
            tokenA: "iZi",
            tokenAddrA: "0x9ad37205d608B8b219e6a2573f922094CEc5c200",
            tokenAddrB: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            tokenB: "ETH",
            tokenDecimalA: 18,
            tokenDecimalB: 18,
            tokenLock: "iZi",
            tokenUni: "ETH",
            twoRewards: false
        },
        userData:{
            earned: ['0']
        }
    }
];


export default function VaultList({vaults,tokens,apys,fetchBalancesDone,fetchVaultsDataDone,fetchApysDone,...props}) {
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

      return (
            <Accordion  allowMultiple={true} allowToggle={true} width={'inherit'}>
                <Flex margin="20px" justifyItems={'center'} justifyContent={'space-between'}>
                    <Heading size={'xl'} color={'gray.600'}> Poolify Core </Heading>
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
                        <Heading
                            size="md"
                            color={useColorModeValue('tertiary.100', 'tertiary.600')}
                        >
                            No vaults to display.
                        </Heading>
                    </Center>
                )}

                <Flex margin="20px" justifyItems={'center'} justifyContent={'space-between'}>
                    <Heading size={'xl'} color={'gray.600'}> Partners </Heading>
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
                        <Heading
                            size="md"
                            color={useColorModeValue('tertiary.100', 'tertiary.600')}
                        >
                            No vaults to display.
                        </Heading>
                    </Center>
                )}


            </Accordion>
      );
}
  
