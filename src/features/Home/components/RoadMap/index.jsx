import { Box, Flex, Heading, Text,Button,Image, Link,useBreakpointValue } from '@chakra-ui/react';
import Card from 'components/Card/Card';


const Roadmap = () => {
    const isOneLineMode = useBreakpointValue({ base: false, xl: true });

    return (
        <Card padding="24px" maxWidth={'800px'} minWidth={isOneLineMode?'800px':'100%'} variant="none">
            <Flex  direction="column">
                <Flex flexDirection={'column'} justifyContent={isOneLineMode?'center':'normal'}>

                    <Heading margin={'10px'} textAlign={'left'}>Roadmap</Heading>

                    <Flex flexDirection={'column'} overflowY={'auto'} padding={'24px'} >
                        <Flex flexDirection={'column'} overflowY={'auto'}>
                            <Flex justifyContent={'space-between'} flexDirection={'column'} alignItems={'flex-start'}>
                                <Heading size={'md'}> 1. Implement the core protocol on the Binance Smart Chain network</Heading>
                            </Flex>
                        </Flex>
                    </Flex>
                
                    <Card margin={'15px 30px'} variant={'poolifyBackground'}>
                        <Flex flexDirection={'column'} overflowY={'auto'} padding={'24px'} >
                            <Flex flexDirection={'column'} overflowY={'auto'}>
                                <Flex justifyContent={'space-between'} flexDirection={'column'} alignItems={'flex-start'}>
                                    <Text fontWeight={'bold'}>Enable staking PLFY and LP tokens in the Poolify reward manager</Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Card>

                    <Card margin={'15px 30px'} variant={'poolifyBackground'}>
                        <Flex flexDirection={'column'} overflowY={'auto'} padding={'24px'} >
                            <Flex flexDirection={'column'} overflowY={'auto'}>
                                <Flex justifyContent={'space-between'} flexDirection={'column'} alignItems={'flex-start'}>
                                    <Text fontWeight={'bold'}>Deploy the Stable coin module with the Community Fund</Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Card>

                    <Card margin={'15px 30px'} variant={'poolifyBackground'}>
                        <Flex flexDirection={'column'} overflowY={'auto'} padding={'24px'} >
                            <Flex flexDirection={'column'} overflowY={'auto'}>
                                <Flex justifyContent={'space-between'} flexDirection={'column'} alignItems={'flex-start'}>
                                    <Text fontWeight={'bold'}>Implements strategies for the mains protocols of the BSC chain (Pancake, Ape, etc)</Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Card>

                </Flex>
            </Flex>
        </Card>
    );
};

export default Roadmap;
