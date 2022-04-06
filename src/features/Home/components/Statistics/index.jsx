import { Box, Flex, Heading, Text,Button,Image, Link,useBreakpointValue } from '@chakra-ui/react';
import Card from 'components/Card/Card';
import SmartTag from 'components/SmartTag/SmartTag';


const Statistics = () => {
    const isOneLineMode = useBreakpointValue({ base: false, xl: true });

    return (
        <Card variant={'none'} maxWidth={'800px'} minWidth={isOneLineMode?'800px':'100%'}>
            <Flex  direction="column">
                <Heading margin={'10px'} textAlign={'left'}>Statistics</Heading>
                <Flex flexDirection={isOneLineMode?'row':'column'} alignItems={'center'} justifyContent={isOneLineMode?'center':'normal'}>
                    
                    <Card margin={'10px'} minWidth={'350px'}>
                        <SmartTag variant="green">Live</SmartTag>
                        <Flex flexDirection={'column'} padding={'24px'}>
                            <Flex flexDirection={'column'}>
                                <Flex justifyContent={'space-between'} flexDirection={'column'} alignItems={'center'} >
                                    <Heading size={'md'}> PLFY Price</Heading>
                                    <Heading size={'lg'} color={'poolify.400'}>0.0041 $</Heading>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Card>

                    <Card margin={'10px'} minWidth={'350px'}>
                            <Flex flexDirection={'column'}padding={'24px'} >
                                <Flex flexDirection={'column'}>
                                    <Flex justifyContent={'space-between'} flexDirection={'column'} alignItems={'center'}>
                                        <Heading size={'md'}> Ecosystem TVL</Heading>
                                        <Heading size={'lg'} color={'poolify.400'}>300,000.345 $</Heading>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Card>

                    {/*
                    <Flex flexDirection={'column'} justifyContent={'normal'} flex={'0 0 50%'}>
                        
                        <Card margin={'10px'} minWidth={'350px'}>
                            <Flex flexDirection={'column'} overflowY={'auto'} padding={'24px'} >
                                <Flex flexDirection={'column'} overflowY={'auto'}>
                                    <Flex justifyContent={'space-between'} flexDirection={'column'} alignItems={'center'}>
                                        <Heading size={'md'} color={'black'}> Governance</Heading>
                                        <Text>No open proposition</Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Card>
                    </Flex>
                    
                    */}
                </Flex>
            </Flex>
        </Card>
    );
};

export default Statistics;
