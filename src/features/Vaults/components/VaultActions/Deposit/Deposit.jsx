import {
    Box,
    Text,
    Button,
    Input,
    Flex,
    Tooltip,
    InputGroup,InputLeftElement,InputRightElement,
    Slider,SliderTrack,SliderFilledTrack,SliderThumb,SliderMark
} from "@chakra-ui/react";
import { useTranslation } from 'react-i18next';
import BigNumber from 'bignumber.js';
import { useState,useMemo,useEffect } from 'react';

import {
    byDecimals,
    convertAmountToRawNumber,
    convertAmountFromRawNumber,
} from 'libs/helpers/bignumber';
import {getIconElement,getLPElement} from 'libs/helpers/tokens';
import {useNotifier} from 'libs/helpers/notifier';
import { useFetchBalances,useFetchApproval,useFetchDeposit,useFetchZapEstimate,useFetchZapDeposit } from 'features/Vaults/redux/hooks';
import { useConnectWallet, useDisconnectWallet } from 'libs/hooks/useConnector';


const Deposit = function({vault,...props}){
    const { t } = useTranslation();
    const {DisplayNotification} = useNotifier();
    const { web3, address } = useConnectWallet();
    const { fetchApproval, fetchApprovalPending } = useFetchApproval();
    const { fetchDeposit, fetchDepositBnb, fetchDepositPending } = useFetchDeposit();
    const { fetchZapDeposit } = useFetchZapDeposit();
    const { tokens, tokenBalance, fetchBalances } = useFetchBalances();
    const { fetchZapDepositEstimate, fetchZapEstimatePending } = useFetchZapEstimate();

    const { zap, eligibleTokens } = useMemo(() => {
        const zap = vault.zap;
        return {
          zap,
          eligibleTokens: [
            {
              name: vault.name,
              symbol: vault.token,
              address: vault.tokenAddress,
              decimals: vault.tokenDecimals,
              logoURI: vault.logo,
            },
            ...(zap ? zap.tokens : []),
          ],
        };
    }, [vault.logo, vault.name, vault.token, vault.tokenAddress, vault.tokenDecimals, vault.zap]);

    const vaultFee = {
        depositFee: vault.depositFee,
        withdrawalFee: vault.withdrawalFee,
    };
    //console.log('tokens[eligibleTokens[0].symbol]',tokens[eligibleTokens[0].symbol]);

    const [depositSettings, setDepositSettings] = useState({
        tokenIndex: 0,
        isZap: false,
        token: eligibleTokens[0],
        amount: new BigNumber(0),
        input: '0.0',
        vaultAddress: vault.vaultContractAddress,
        depositAddress: vault.vaultContractAddress,
        isNeedApproval: new BigNumber(
          tokens[eligibleTokens[0].symbol].allowance[vault.vaultContractAddress]
        ).isZero(),
        slippageTolerance: 0.01,
        swapAmountOut: vault.zapEstimate?.swapAmountOut,
    });

    useEffect(() => {
        const allowance = new BigNumber(
          tokens[depositSettings.token.symbol].allowance[depositSettings.depositAddress]
        );

        setDepositSettings(prevState => ({
          ...prevState,
          isNeedApproval: allowance.isZero() || prevState.amount.isGreaterThan(allowance),
        }));

    }, [depositSettings.depositAddress, depositSettings.token.symbol, tokens]);

    // Update token & Balance
    useEffect(() => {
        if (address && web3 && zap){
            const tokens = {};
            eligibleTokens.forEach(token => {
                tokens[token.symbol] = {
                tokenAddress: token.wrappedSymbol ? null : token.address,
                tokenBalance: 0,
                allowance: {
                    [zap.zapAddress]: token.wrappedSymbol ? Infinity : 0,
                },
                decimals: token.decimals,
                ...tokens[token.symbol],
                };
            });
            fetchBalances({ address, web3, tokens });
        }
    }, [address, web3, fetchBalances, zap, eligibleTokens]);

    const selectMax = () => {
        const maxAvailable = tokenBalance(depositSettings.token.symbol);

        let amount = new BigNumber(0);
            amount = maxAvailable;
        const allowance = new BigNumber(
            tokens[depositSettings.token.symbol].allowance[depositSettings.depositAddress]
        );

        setDepositSettings(prevState => ({
            ...prevState,
            amount: amount,
            input: amount.toFormat(),
            isNeedApproval: allowance.isZero(),
        }));
    }

    const handleInputAmountChange = event => {
        
        const input = event.target.value.replace(/[,]+/, '').replace(/[^0-9.]+/, '');
        let amount = new BigNumber(input);
        const maxAvailable = tokenBalance(depositSettings.token.symbol);
        if (amount.isNaN()) amount = new BigNumber(0);
    
        amount = amount.decimalPlaces(depositSettings.token.decimals);
        if (amount.isGreaterThan(maxAvailable)) amount = maxAvailable;
    
        const allowance = new BigNumber(
          tokens[depositSettings.token.symbol].allowance[depositSettings.depositAddress]
        );
    
        setDepositSettings(prevState => ({
          ...prevState,
          amount: amount,
          input: amount.isEqualTo(input || '0') ? input : amount.toFormat(),
          isNeedApproval: allowance.isZero(),
        }));
    };
    

    const handleApproval = () => {
        fetchApproval({
          address,
          web3,
          tokenAddress: depositSettings.token.address,
          contractAddress: depositSettings.depositAddress,
          tokenSymbol: depositSettings.token.symbol,
          DisplayNotification
        })
        .then(() => DisplayNotification({message:t('Vault-ApprovalSuccess'), status: 'success' }))
        .catch(error => DisplayNotification({ message:t('Vault-ApprovalError', { error }),variant: 'error' }));
    };

    const resetInput = () => {
        setDepositSettings(prevState => ({
            ...prevState,
            amount: new BigNumber(0),
            input: '0.0'
        }));
    }

    const handleDepositAmount = () => {
        depositAssets(depositSettings);
    };

    const depositAssets = deposit => {
        console.log('deposit',deposit);
        let toastId = new Date().getTime() + Math.random();
        if(vault.depositsPaused){
          console.error('Deposits paused!');
          return;
        }
    
        if(deposit.isZap){
            // Zap deposit
            /* TO DO later 
            const swapAmountOut = vault.zapEstimate.swapAmountOut;
            const swapAmountOutMin = new BigNumber(
                swapAmountOut - swapAmountOut * deposit.slippageTolerance
            );

            const zapDepositArgs = {
                vaultAddress: deposit.vaultAddress,
                isETH: !!deposit.token.wrappedSymbol,
                tokenAddress: deposit.token.address,
                tokenAmount: convertAmountToRawNumber(deposit.amount, deposit.token.decimals),
                zapAddress: deposit.depositAddress,
                swapAmountOutMin: swapAmountOutMin.toFixed(0),
                address,
                web3,
            };
            fetchZapDeposit(zapDepositArgs)
            .then(() => {
                DisplayNotification({message:t('Vault-DepositSuccess'),status: 'success' });
                fetchBalances({ address, web3, tokens });
            })
            .catch(error => DisplayNotification({message:t('Vault-DepositError', { error }),status: 'error' }));
            */
        }else{
          // Vault deposit
          const depositArgs = {
            address,
            web3,
            isAll: !!deposit.isAll,
            amount: convertAmountToRawNumber(deposit.amount, deposit.token.decimals),
            contractAddress: deposit.vaultAddress,
            DisplayNotification,
            toastId
          };
          console.log('depositArgs',depositArgs);
          
          if(vault.tokenAddress){
            fetchDeposit(depositArgs)
            .then(() => {
                DisplayNotification({key:toastId,message:t('Vault-DepositSuccess'),status: 'success' });
                fetchBalances({ address, web3, tokens });
                resetInput();
            })
            .catch(error =>
                DisplayNotification({key:toastId,message:t('Vault-DepositError', { error }),status: 'error' })
            );
          }else{
            fetchDepositBnb(depositArgs)
            .then(() => {
                DisplayNotification({key:toastId,message:t('Vault-DepositSuccess'),status: 'success' });
                fetchBalances({ address, web3, tokens });
                resetInput();
            })
            .catch(error =>
                DisplayNotification({key:toastId,message:t('Vault-DepositError', { error }),status: 'error' })
            );
          }
        }
      };

      const redirectToZap = () => {
          window.open(vault.buyTokenUrl);
      }

    return (
        <Flex flexDirection={'column'} maxHeight={'90vh'} overflowY={'auto'} padding={'24px'}>
            <Flex alignItems={'center'} justifyContent={'space-between'} marginBottom={'8px'}>
                <Text>{t('Vault-Balance')}:</Text>
                <Flex alignContent={'center'}>
                    <Text paddingRight={'5px'}>
                    {byDecimals(tokens[vault.token].tokenBalance, vault.tokenDecimals).toFormat(4)}{' '}
                    </Text>
                    {getIconElement(vault)}
                </Flex>
            </Flex>
            <InputGroup>
                <InputLeftElement 
                    height={'3rem'}
                    pointerEvents='none'
                    color='gray.300'
                    fontSize='1.2em'
                >
                    {getIconElement(vault)}
                </InputLeftElement>
                <Input height={'3rem'} value={depositSettings.input} onChange={handleInputAmountChange} disabled={vault.depositsPaused}
                    pattern="^[0-9]*[.,]?[0-9]{0,18}$" inputMode="decimal" min="0" placeholder="0.0" scale="md" size='lg' 
                />
                <InputRightElement height={'3rem'}>
                    <Button onClick={selectMax} colorScheme='blue' variant='link' size='sm' flexGrow={'1'} marginLeft={'2'} marginRight={'2'}>
                        Max {/*getLPElement(vault) */}
                    </Button>
                </InputRightElement>
            </InputGroup>
            
        

            <Flex marginTop={'30px'} justifyContent={'center'} flexDirection={'column'}>
                
                {vault.buyTokenUrl?(
                    <Button size='lg' width={'100%'} variant='outline' color={'blue.600'} onClick={redirectToZap}>
                        {vault.categories.includes('SingleAsset')?'Get Token':'Get LP Token'}
                    </Button>
                ):
                (
                    <Box marginTop={'8px'} height='48px'></Box>
                )}
                
                {depositSettings.isNeedApproval ? (
                    <Button colorScheme='blue' marginTop={'8px'} size='lg' width={'100%'}
                        onClick={handleApproval}
                        disabled={vault.depositsPaused || fetchApprovalPending[depositSettings.token.symbol]}
                    >
                        {fetchApprovalPending[depositSettings.token.symbol]
                            ? `${t('Vault-Approving')}`
                            : `${t('Vault-ApproveButton')}`
                        }
                    </Button>
                ):
                (
                    
                    <Button colorScheme='blue' marginTop={'8px'} size='lg' width={'100%'}
                        disabled={
                            vault.depositsPaused ||
                            fetchZapEstimatePending[vault.vaultContractAddress] ||
                            fetchDepositPending[vault.vaultContractAddress] ||
                            depositSettings.amount.isZero() ||
                            tokenBalance(depositSettings.token.symbol).isZero()
                        }
                        onClick={handleDepositAmount}
                    >
                        {t('Vault-DepositButton')}
                    </Button>
                )
                }
                

            </Flex>
        </Flex>
    )
}

export default Deposit;

/*

<Flex height={'48px'} alignItems={'center'}>
    <Slider
        id='slider'
        defaultValue={5}
        min={0}
        max={100}
        colorScheme='blue'
        onChange={(v) => setSliderValue(v)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        >
        <SliderMark value={25} mt='1' ml='-2.5' fontSize='sm'>
            25%
        </SliderMark>
        <SliderMark value={50} mt='1' ml='-2.5' fontSize='sm'>
            50%
        </SliderMark>
        <SliderMark value={75} mt='1' ml='-2.5' fontSize='sm'>
            75%
        </SliderMark>
        <SliderTrack>
            <SliderFilledTrack />
        </SliderTrack>
        <Tooltip
            hasArrow
            bg='blue.500'
            color='white'
            placement='top'
            isOpen={showTooltip}
            label={`${sliderValue}%`}
        >
            <SliderThumb />
        </Tooltip>
    </Slider>
</Flex>
<Flex height={'48px'} alignItems={'center'} justifyContent={'space-between'}>
        <Button colorScheme='blue' size='sm' flexGrow={'1'} marginLeft={'2'} marginRight={'2'}>
            25%
        </Button>
        <Button colorScheme='blue' size='sm' flexGrow={'1'} marginLeft={'2'} marginRight={'2'}>
            50%
        </Button>
        <Button colorScheme='blue' size='sm' flexGrow={'1'} marginLeft={'2'} marginRight={'2'}>
            75%
        </Button>
        <Button colorScheme='blue' size='sm' flexGrow={'1'} marginLeft={'2'} marginRight={'2'}>
            Max
        </Button>
</Flex>
*/