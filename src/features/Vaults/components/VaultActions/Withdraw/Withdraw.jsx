import {
    Text,
    useColorModeValue,
    Button,
    Input,
    Flex,
    Box,
    Tooltip,
    InputGroup,InputLeftElement,InputRightElement,
    Slider,SliderTrack,SliderFilledTrack,SliderThumb,SliderMark
} from "@chakra-ui/react";
import { useTranslation } from 'react-i18next';
import BigNumber from 'bignumber.js';


import {
    byDecimals,
    convertAmountToRawNumber,
    convertAmountFromRawNumber,
} from 'libs/helpers/bignumber';
import { useState,useMemo,useEffect } from 'react';
import {getIconElement,getLPElement} from 'libs/helpers/tokens';
import { useNotifier } from 'libs/helpers/notifier';
import { useFetchBalances,useFetchWithdraw,useFetchZapEstimate } from 'features/Vaults/redux/hooks';
import { useConnectWallet, useDisconnectWallet } from 'libs/hooks/useConnector';

const withdraw = function({vault, index, sharesBalance,...props}){
    const { t } = useTranslation();
    const { DisplayNotification } = useNotifier();
    const { web3, address } = useConnectWallet();

    const {
        fetchWithdraw,
        fetchWithdrawBnb,
        fetchZapWithdrawAndRemoveLiquidity,
        fetchZapWithdrawAndSwap,
        fetchWithdrawPending,
      } = useFetchWithdraw();
    const { fetchZapWithdrawEstimate, fetchZapEstimatePending } = useFetchZapEstimate();
    const { tokens, fetchBalances, fetchPairReverves } = useFetchBalances();

    const sharesDecimals = vault.tokenDecimals;
    const sharesByDecimals = byDecimals(sharesBalance, sharesDecimals);
    const underliyngBalance = sharesByDecimals
      .multipliedBy(vault.isPoolifyStaking?vault.pricePerFullShare:1)
      .decimalPlaces(vault.tokenDecimals, BigNumber.ROUND_DOWN);

    const [withdrawSettings, setWithdrawSettings] = useState({
        isZap: false,
        isSwap: false,
        swapInput: undefined,
        swapOutput: undefined,
        outputIndex: 0,
        amount: new BigNumber(0),
        input: '0.0',
        vaultAddress: vault.earnContractAddress,
        withdrawAddress: vault.earnContractAddress,
        isNeedApproval: false,
        slippageTolerance: 0.01,
        swapAmountOut: vault.zapWithdrawEstimate?.swapAmountOut,
      });

    const selectMax = () => {

        let amount = underliyngBalance;
        let input = amount.toFormat();
    
        setWithdrawSettings(prevState => ({
          ...prevState,
          amount: amount,
          input: input,
        }));
    }

    const handleInputAmountChange = event => {
        const input = event.target.value.replace(/[,]+/, '').replace(/[^0-9.]+/, '');
        let amount = new BigNumber(input);
    
        if (amount.isNaN()) amount = new BigNumber(0);
        if (amount.isGreaterThan(underliyngBalance)) amount = underliyngBalance;
    
        setWithdrawSettings(prevState => ({
          ...prevState,
          amount: amount,
          input: amount.isEqualTo(input) ? input : amount.toFormat(),
        }));
    };


    /** Effects **/
    useEffect(() => {
        const allowance = new BigNumber(
          tokens[vault.vaultToken].allowance[withdrawSettings.withdrawAddress]
        );
        setWithdrawSettings(prevState => ({
          ...prevState,
          isNeedApproval: prevState.isZap && allowance.isZero(),
        }));
    }, [vault.vaultToken, tokens, withdrawSettings.withdrawAddress]);

    const resetInput = () => {
      setWithdrawSettings(prevState => ({
          ...prevState,
          amount: new BigNumber(0),
          input: '0.0'
      }));
  }
    
    const handleWithdraw = () => {
      const sharesAmount = withdrawSettings.amount
      .dividedBy(vault.isPoolifyStaking?vault.pricePerFullShare:1)
      .decimalPlaces(sharesDecimals, BigNumber.ROUND_UP);

        if (sharesAmount.times(100).dividedBy(sharesByDecimals).isGreaterThan(99)) {
          return handleWithdrawAll();
        }
        withdraw(convertAmountToRawNumber(sharesAmount, sharesDecimals));
    };
    
    const handleWithdrawAll = () => {
        const isAll = true;
        setWithdrawSettings(prevState => ({
          ...prevState,
          amount: underliyngBalance,
          input: underliyngBalance.toFormat(),
          slider: 100,
        }));
        withdraw(convertAmountToRawNumber(sharesByDecimals, sharesDecimals), isAll);
    };
    
    const withdraw = (sharesAmount, isAll = false) => {
        const vaultWithdrawArgs = {
            address,
            web3,
            isAll,
            amount: sharesAmount,
            contractAddress: vault.earnContractAddress,
            index,
            DisplayNotification
        };
        if (vault.tokenAddress) {
            fetchWithdraw(vaultWithdrawArgs)
              .then(() => {
                DisplayNotification({message:t('Vault-WithdrawSuccess'),status: 'success' });
                fetchBalances({ address, web3, tokens });
                resetInput();
              })
              .catch(error =>
                DisplayNotification({message:t('Vault-WithdrawError', { error }),status: 'error' })
              );
        } else {
            fetchWithdrawBnb(vaultWithdrawArgs)
              .then(() => {
                DisplayNotification({message:t('Vault-WithdrawSuccess'),status: 'success' });
                fetchBalances({ address, web3, tokens });
                resetInput();
              })
              .catch(error =>
                DisplayNotification({message:t('Vault-WithdrawError', { error }),status: 'error' })
              );
        }
    };

    return (
        <Flex flexDirection={'column'} maxHeight={'90vh'} overflowY={'auto'} padding={'24px'}>
            <Flex alignItems={'center'} justifyContent={'space-between'} marginBottom={'8px'}>
                <Text>Deposited Balance:</Text>
                <Flex alignContent={'center'}>
                    <Text paddingRight={'5px'}>
                    {byDecimals(
                        new BigNumber(tokens[vault.vaultToken].tokenBalance).multipliedBy(new BigNumber(vault.isPoolifyStaking?vault.pricePerFullShare:1)),
                        vault.tokenDecimals
                     ).toFormat(4)}{' '}
                    </Text>
                    {getIconElement(vault)}
                </Flex>
            </Flex>
            <InputGroup>
                <InputLeftElement
                    height={'-webkit-fill-available'}
                    pointerEvents='none'
                    color='gray.300'
                    fontSize='1.2em'
                    children={getIconElement(vault)}
                />
                <Input 
                    value={withdrawSettings.input} onChange={handleInputAmountChange}
                    pattern="^[0-9]*[.,]?[0-9]{0,18}$" inputMode="decimal" min="0" placeholder="0.0" scale="md" size='lg' 
                />
                <InputRightElement
                    height={'-webkit-fill-available'}
                    children={
                        <Button onClick={selectMax} colorScheme='blue' variant='link' size='sm' flexGrow={'1'} marginLeft={'2'} marginRight={'2'}>
                            Max {/*getLPElement(vault) */}
                        </Button>
                    } 
                />
            </InputGroup>
            <Flex marginTop={'30px'} justifyContent={'center'} flexDirection={'column'}>
                <Box marginTop={'8px'} height='48px'></Box>
                <Button colorScheme='blue' size='lg' width={'100%'} height='48px' onClick={handleWithdraw}>
                    Withdraw
                </Button>
            </Flex>
        </Flex>
    )
}

export default withdraw;