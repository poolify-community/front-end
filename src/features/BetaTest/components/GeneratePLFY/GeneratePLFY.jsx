import {
    Text,
    Button,
    Flex,
    Heading,
    Spacer
} from "@chakra-ui/react";
import BigNumber from 'bignumber.js';
import { useTranslation } from 'react-i18next';
import React,{useEffect,useState} from 'react';

import Card from 'components/Card/Card';
import {getIconElement,getLPElement} from 'libs/helpers/tokens';
import { useConnectWallet, useDisconnectWallet } from 'libs/hooks/useConnector';
import {useNotifier} from 'libs/helpers/notifier';
import {requestTestPLFY,isRequestAvailable} from 'libs/web3';


const styles = {
    amountText:{
        paddingRight:'5px',
        fontSize: '20px',
        lineHeight: '1.07143',
        fontWeight: '600',
        letterSpacing: '-.005em'
    },
    amountLimitText:{
        paddingRight:'5px',
        fontSize: '15px',
        lineHeight: '1.07143',
        fontWeight: '400',
        letterSpacing: '-.005em'
    }
}

const FETCH_INTERVAL_MS_FAST = 3000;

const GeneratePLFY = function({tokens,vaults,pendingPLFY,fetchPendingPLFYDone,...props}){
    const { DisplayNotification } = useNotifier();
    const { web3, address } = useConnectWallet();
    const [displayRequestButton,setRequestDisplayButton] = useState(true);
    
    const fetchRequestButton = async () => {
        let res = await isRequestAvailable({address,web3});
        // we return !res ;
        setRequestDisplayButton(!res);
    }
    
    useEffect(() => {
        const fetch = () => {
            if(web3){
                fetchRequestButton();
            }
            
        };
        fetch();
    
        const id = setInterval(fetch, FETCH_INTERVAL_MS_FAST);
        return () => clearInterval(id);
    }, [address, web3]);

    

    const claimPLFYForTesting = () => {
        console.log('claimPLFYForTesting');
        requestTestPLFY({
            address,
            web3,
        })
        .then(() => DisplayNotification({message:'You received 10 000 PLFY', status: 'success' }))
        .catch(error => DisplayNotification({ message:`Error : ${error}`,variant: 'error' }));
    }

    return (
        <Card variant={'poolifyBackground'} maxWidth={'450px'} marginLeft={'auto'} marginRight={'auto'}>
            <Flex flexDirection={'column'} maxHeight={'90vh'} overflowY={'auto'} padding={'24px'} minW={'350px'} >
                <Flex flexDirection={'column'} maxHeight={'90vh'} overflowY={'auto'}>
                    <Flex justifyContent={'space-between'} flexDirection={'column'} alignItems={'flex-start'}>
                        <Heading size={'md'} color={'white'}> Request PLFY</Heading>
                        <Text fontStyle={'italic'}>« This is only for the TEST Net »</Text>
                    </Flex>
                    <Flex alignItems={'center'} justifyContent={'space-between'} marginBottom={'8px'} marginTop={'30px'}>
                        <Spacer/>
                        <Flex alignItems={'center'}>
                            <Flex justifyContent={'space-between'} flexDirection={'column'} alignItems={'flex-end'}>
                            <Text style={styles.amountText}>
                                2 000
                            </Text>
                            <Text style={styles.amountLimitText}>
                                (only 1 time / 6h)
                            </Text>
                            </Flex>
                            {getIconElement({tokenA:'POOLIFY'},'lg')}
                        </Flex>
                    </Flex>
                    <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'} mt={'5px'}>
                        <Button variant="poolify-reverse" size='lg' height='40px' w={'100%'} 
                            disabled={displayRequestButton} 
                            onClick={claimPLFYForTesting}
                        >
                            Claim PLFY
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    )
}

export default GeneratePLFY;
