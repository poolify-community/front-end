import { Box, Flex, Heading, Text,Button,Image, Link,useBreakpointValue } from '@chakra-ui/react';
import CustomCard from 'components/CustomCard/CustomCard';

const Roadmap = () => {
    const isOneLineMode = useBreakpointValue({ base: false, xl: true });

    return (
        <Box   minWidth={isOneLineMode?'800px':'100%'} variant="none" color={'white'}>
            <Flex  direction="column">
                <Flex flexDirection={'column'} justifyContent={isOneLineMode?'center':'normal'}>

                    <Heading margin={'10px'} textAlign={'left'} color="white">Roadmap</Heading>

                    <Flex flexDirection={'column'} padding={'24px'} >
                        <Flex flexDirection={'column'}>
                            <Flex justifyContent={'space-between'} flexDirection={'column'} alignItems={'flex-start'}>
                                <Heading size={'md'}> 1. Implement the core protocol on the Binance Smart Chain network</Heading>
                            </Flex>
                        </Flex>
                    </Flex>
                
                    <CustomCard margin={'15px 30px'} variant={'poolifyBackground'}>
                        <Flex flexDirection={'column'} padding={'24px'} >
                            <Flex flexDirection={'column'}>
                                <Flex justifyContent={'space-between'} flexDirection={'column'} alignItems={'flex-start'}>
                                    <Text fontWeight={'bold'}>Enable staking PLFY and LP tokens in the Poolify reward manager</Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    </CustomCard>

                    <CustomCard margin={'15px 30px'} variant={'poolifyBackground'}>
                        <Flex flexDirection={'column'} padding={'24px'} >
                            <Flex flexDirection={'column'}>
                                <Flex justifyContent={'space-between'} flexDirection={'column'} alignItems={'flex-start'}>
                                    <Text fontWeight={'bold'}>Deploy the Stable coin module with the Community Fund</Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    </CustomCard>

                    <CustomCard margin={'15px 30px'} variant={'poolifyBackground'}>
                        <Flex flexDirection={'column'} padding={'24px'} >
                            <Flex flexDirection={'column'}>
                                <Flex justifyContent={'space-between'} flexDirection={'column'} alignItems={'flex-start'}>
                                    <Text fontWeight={'bold'}>Implements strategies for the mains protocols of the BSC chain (Pancake, Ape, etc)</Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    </CustomCard>

                </Flex>
            </Flex>
        </Box>
    );
};

export default Roadmap;
