import { Box, Flex, Heading, Text,Button,Image, Link,useBreakpointValue } from '@chakra-ui/react';
import Card from 'components/Card/Card';


const styles = {
    statCard:{
        'background': 'rgb(253, 254, 255)',
        'box-shadow': 'rgb(218 206 230 / 25%) 0px 0px 27px 5px'
    }
}

const Roadmap = () => {
    const isOneLineMode = useBreakpointValue({ base: false, xl: true });

    return (
        <Card mt={'50px'} padding="24px" maxWidth={'800px'} minWidth={isOneLineMode?'800px':'100%'}>
            <Flex  direction="column">
                <Flex
                    bg={'poolify.400'}
                    position="relative"
                    w="312px"
                    h="38px"
                    mb="23px"
                    borderRadius={'20px'}
                    lineHeight="38px"
                    alignItems="center"
                    justifyContent="center"
                    mx="auto"
                    padding={'10px'}
                    color={'#FFFFFF'}
                    top={'-43px'}
                >
                    <Heading size={'md'}>Road map</Heading>
                </Flex>
                <Flex flexDirection={'column'} justifyContent={isOneLineMode?'center':'normal'}>

                    <Flex flexDirection={'column'} overflowY={'auto'} padding={'24px'} >
                        <Flex flexDirection={'column'} overflowY={'auto'}>
                            <Flex justifyContent={'space-between'} flexDirection={'column'} alignItems={'flex-start'}>
                                <Heading size={'md'} color={'black'}> 1. Implement the core protocol on the Binance Smart Chain network</Heading>
                            </Flex>
                        </Flex>
                    </Flex>

                    <Card margin={'10px'} style={styles.statCard}>
                        <Flex flexDirection={'column'} overflowY={'auto'} padding={'24px'} >
                            <Flex flexDirection={'column'} overflowY={'auto'}>
                                <Flex justifyContent={'space-between'} flexDirection={'column'} alignItems={'flex-start'}>
                                    <Text>Enable staking PLFY and LP tokens in the Poolify reward manager</Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Card>

                    <Card margin={'10px'} style={styles.statCard}>
                        <Flex flexDirection={'column'} overflowY={'auto'} padding={'24px'} >
                            <Flex flexDirection={'column'} overflowY={'auto'}>
                                <Flex justifyContent={'space-between'} flexDirection={'column'} alignItems={'flex-start'}>
                                    <Text>Deploy the Stable coin module with the Community Fund</Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Card>

                    <Card margin={'10px'} style={styles.statCard}>
                        <Flex flexDirection={'column'} overflowY={'auto'} padding={'24px'} >
                            <Flex flexDirection={'column'} overflowY={'auto'}>
                                <Flex justifyContent={'space-between'} flexDirection={'column'} alignItems={'flex-start'}>
                                    <Text>Implements strategies for the mains protocols of the BSC chain (Pancake, Ape, etc)</Text>
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
