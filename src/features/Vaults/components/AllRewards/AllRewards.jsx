import {
    Text,
    Button,
    Flex,
    Heading,
    Spacer
} from "@chakra-ui/react";
import BigNumber from 'bignumber.js';
import React,{useEffect,useState} from 'react';
import Card from 'components/Card/Card';
import {getIconElement,getLPElement} from 'libs/helpers/tokens';
import { fetchPrice } from 'libs/web3';

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

export default function({tokens,vaults,pendingPLFY,fetchPendingPLFYDone,...props}){
    const [bounty, setBounty] = useState('0');
    const [bountyUSD, setBountyUSD] = useState('0');
    useEffect(() => {
        let _bounty = calculatePendingPLFYandBounty(vaults,pendingPLFY);
        let _bountyUSD = _bounty.times(fetchPrice({ id: 'PLFY' }));
        setBounty(_bounty.toFormat(4));
        setBountyUSD(_bountyUSD.toFormat(4))
    }, [vaults,pendingPLFY,fetchPendingPLFYDone]);


    return (
        <Card>
            <Flex flexDirection={'column'} maxHeight={'90vh'} overflowY={'auto'} padding={'24px'} >
                <Flex flexDirection={'column'} maxHeight={'90vh'} overflowY={'auto'}>
                    <Flex justifyContent={'space-between'} flexDirection={'column'} alignItems={'flex-start'}>
                        <Heading size={'md'} color={'black'}> Claim PLFY Bounty</Heading>
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
                        <Button colorScheme='blue' size='lg' height='40px' w={'100px'}>
                            Claim 
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    )
}
