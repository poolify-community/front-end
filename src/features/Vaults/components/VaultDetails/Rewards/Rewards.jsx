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
import BigNumber from 'bignumber.js';


import {
    byDecimals,
    convertAmountToRawNumber,
    convertAmountFromRawNumber,
} from 'libs/helpers/bignumber';
import { useState,useMemo,useEffect } from 'react';
import {getIconElement,getLPElement} from 'libs/helpers/tokens';
import { useFetchBalances } from 'features/Vaults/redux/hooks';
import { useConnectWallet, useDisconnectWallet } from 'libs/hooks/useConnector';

export default function({vault, index, sharesBalance,...props}){

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

    return (
        <Flex flexDirection={'column'} maxHeight={'90vh'} overflowY={'auto'}>
            <Flex alignItems={'center'} justifyContent={'space-between'} marginBottom={'8px'} marginTop={'30px'}>
                <Text>Rewards:</Text>
                <Flex alignItems={'center'}>
                    <Text paddingRight={'5px'}>
                    {byDecimals(
                            0,
                            vault.tokenDecimals
                    ).toFormat(4)}{' '}
                    </Text>
                    {getIconElement(vault)}
                </Flex>
            </Flex>
            <Flex justifyContent={'center'} flexDirection={'column'}>
                <Button colorScheme='blue' size='lg' width={'100%'} height='48px'>
                    Claim Rewards
                </Button>
            </Flex>
        </Flex>
    )
}


/*
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
                    Max 
                    </Button>
                } 
        />
    </InputGroup>
*/