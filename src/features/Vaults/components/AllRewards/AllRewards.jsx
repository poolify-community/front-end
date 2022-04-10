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

import CustomCard from 'components/CustomCard/CustomCard';
import {getIconElement,getLPElement} from 'libs/helpers/tokens';
import { fetchPrice } from 'libs/web3';
import { useFetchHarvestAll } from 'features/Vaults/redux/hooks';
import { useConnectWallet, useDisconnectWallet } from 'libs/hooks/useConnector';
import {useNotifier} from 'libs/helpers/notifier';


const styles = {
    bountyText:{
        paddingRight:'5px',
        fontSize: '20px',
        lineHeight: '1.07143',
        fontWeight: '600',
        letterSpacing: '-.005em'
    },
    bountyUSDText:{
        paddingRight:'5px',
        fontSize: '15px',
        lineHeight: '1.07143',
        fontWeight: '400',
        letterSpacing: '-.005em'
    }
}

const calculatePendingPLFYandBounty = (vaults,pendingPLFY) => {
    let allRewards = vaults.filter(x => x.includeHarvestBounty).map(x => pendingPLFY[x.id]).filter(x => x != undefined);
    let bounty = allRewards.reduce((r,x) => {
        return r.plus(new BigNumber(x.pendingReward).times(x.bountyFee).dividedBy(x.bountyPrecision).dividedBy('1e18'));
    },new BigNumber(0));
    
    return bounty;
}



const AllRewards = function({tokens,vaults,pendingPLFY,fetchPendingPLFYDone,...props}){
    const { t } = useTranslation();
    const {DisplayNotification} = useNotifier();
    const { web3, address } = useConnectWallet();
    const { fetchHarvestAll, fetchHarvestPending } = useFetchHarvestAll();

    const [bounty, setBounty] = useState('0');
    const [bountyUSD, setBountyUSD] = useState('0');



    useEffect(() => {
        console.log('pendingPLFY',pendingPLFY);
        let _bounty = calculatePendingPLFYandBounty(vaults,pendingPLFY);
        let _bountyUSD = _bounty.times(fetchPrice({ id: 'PLFY' }));
        setBounty(_bounty.toFormat(4));
        setBountyUSD(_bountyUSD.toFormat(4))
    }, [vaults,pendingPLFY,fetchPendingPLFYDone]);

    const claimBounty = () => {
        console.log('claimBounty');
        let toastId = new Date().getTime() + Math.random();
        fetchHarvestAll({
            address,
            web3,
            vaults:vaults.filter(x => x.includeHarvestBounty),
            DisplayNotification,
            toastId
          })
          .then(() => DisplayNotification({message:t('Vault-ApprovalSuccess'), status: 'success' }))
          .catch(error => DisplayNotification({ message:t('Vault-ApprovalError', { error }),variant: 'error' }));
    }


    return (
        <CustomCard>
            <Flex flexDirection={'column'} maxHeight={'90vh'} overflowY={'auto'} padding={'24px'} minWidth={'350px'}>
                <Flex flexDirection={'column'} maxHeight={'90vh'} overflowY={'auto'}>
                    <Flex justifyContent={'space-between'} flexDirection={'column'} alignItems={'flex-start'}>
                        <Heading size={'md'}> Claim PLFY Bounty</Heading>
                        <Text>for community harvesting</Text>
                    </Flex>
                    <Flex alignItems={'center'} justifyContent={'space-between'} marginBottom={'8px'} marginTop={'30px'}>
                        <Spacer/>
                        <Flex alignItems={'center'}>
                            <Flex justifyContent={'space-between'} flexDirection={'column'} alignItems={'flex-end'}>
                            <Text style={styles.bountyText}>
                                {bounty}
                            </Text>
                            <Text style={styles.bountyUSDText}>
                                ({bountyUSD}$)
                            </Text>
                            </Flex>
                            {getIconElement({tokenA:'POOLIFY'},'lg')}
                        </Flex>
                    </Flex>
                    <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'} mt={'5px'}>
                        <Button colorScheme='blue' size='lg' height='40px' w={'100%'} onClick={claimBounty}>
                            Claim 
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </CustomCard>
    )
}

export default AllRewards;
