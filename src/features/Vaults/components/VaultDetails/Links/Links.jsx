
import {
    Box,
    Text,
    Flex,
    GridItem,
    Heading,
    Link,
    useColorModeValue
} from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons';
import {CoreIcon} from 'components/Icons/Icons';
import Rewards from '../Rewards/Rewards';
import {MetamaskIcon} from 'components/Icons/Icons';
import { registerToken } from 'libs/web3';

export default function({vault,links}){

    const addToMetamask = () => {
        registerToken(vault.tokenAddress, vault.token, vault.tokenDecimals)
    }
    
    return (
        <Flex flexBasis={{base:'unset',md:'230px'}} alignItems={'flex-start'} justifyContent={'flex-start'} h='inherit' paddingBottom={'50px'}>
                <Flex marginLeft={'15px'} flexDirection={'column'} alignItems={'flex-start'}>
                    <Link href={'#'} isExternal variant={'poolify-links'}>
                        See contract <ExternalLinkIcon mx='2px' />
                    </Link>
                    <Link href={vault.buyTokenUrl} isExternal variant={'poolify-links'}>
                        Buy Token <ExternalLinkIcon mx='2px' />
                    </Link>
                    <Link isExternal variant={'poolify-links'} onClick={addToMetamask}>
                        Add to metamask <MetamaskIcon/>
                    </Link>
                    
                    <Box    
                        borderRadius={'16px'} mt={'5px'}
                        color={useColorModeValue('poolify.400', 'poolify.400')}
                        w={'fit-content'}
                        padding={'0px 6px'}
                        alignItems={'center'}
                        borderColor={useColorModeValue('poolify.400','poolify.400')}
                        border={useColorModeValue('2px solid', '2px solid')} 
                        display={'inline-flex'}
                    >
                        <CoreIcon /> 
                        <Text ml={'5px'} fontWeight={'bold'}>Core</Text>
                    </Box>
                    {/* <Rewards vault={vault}></Rewards>    */} 
                </Flex>
        </Flex>
      );
}