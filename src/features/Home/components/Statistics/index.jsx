import { Box, Flex, Heading, Text,Button,Image, Link,useBreakpointValue } from '@chakra-ui/react';
import CustomCard from 'components/CustomCard/CustomCard';
import SmartTag from 'components/SmartTag/SmartTag';


const Statistics = () => {
    const isOneLineMode = useBreakpointValue({ base: false, xl: true });

    return (
        <Box variant={'none'} maxWidth={'800px'} minWidth={isOneLineMode?'auto':'100%'} color={'white'}>
            <Flex  direction="column">
                <Heading margin={'10px'} textAlign={'left'}>Statistics</Heading>
                <Flex flexDirection={isOneLineMode?'column':'column'} alignItems={'center'} justifyContent={isOneLineMode?'center':'normal'}>
                    
                    <CustomCard className='bg-white' margin={'10px'} minWidth={'350px'}>
                        <SmartTag variant="green">Live</SmartTag>
                        <Flex flexDirection={'column'} padding={'24px'}>
                            <Flex flexDirection={'column'}>
                                <Flex justifyContent={'space-between'} flexDirection={'column'} alignItems={'center'} >
                                    <Heading size={'md'}> PLFY Price </Heading>
                                    <Heading size={'lg'} color={'poolify.400'}>0.0041 $</Heading>
                                </Flex>
                            </Flex>
                        </Flex>
                    </CustomCard>

                    <CustomCard className='bg-white' margin={'10px'} minWidth={'350px'}>
                            <Flex flexDirection={'column'}padding={'24px'} >
                                <Flex flexDirection={'column'}>
                                    <Flex justifyContent={'space-between'} flexDirection={'column'} alignItems={'center'}>
                                        <Heading size={'md'}> Ecosystem TVL </Heading>
                                        <Heading size={'lg'} color={'poolify.400'}>300,000.345 $</Heading>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </CustomCard>

                    {/*
                    <Flex flexDirection={'column'} justifyContent={'normal'} flex={'0 0 50%'}>
                        
                        <CustomCard margin={'10px'} minWidth={'350px'}>
                            <Flex flexDirection={'column'} overflowY={'auto'} padding={'24px'} >
                                <Flex flexDirection={'column'} overflowY={'auto'}>
                                    <Flex justifyContent={'space-between'} flexDirection={'column'} alignItems={'center'}>
                                        <Heading size={'md'} color={'black'}> Governance</Heading>
                                        <Text>No open proposition</Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </CustomCard>
                    </Flex>
                    
                    */}
                </Flex>
            </Flex>
        </Box>
    );
};

export default Statistics;
