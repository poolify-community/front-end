import { Box, Flex, Heading, Text,Button,Image, Link,useBreakpointValue } from '@chakra-ui/react';
import Card from 'components/Card/Card';


const styles = {
    statCard:{
        background: '#ededf2',
        'box-shadow': 'rgb(218 206 230 / 25%) 0px 0px 27px 5px',
        border:'1px #d1d1d1 solid',
    }
}

const Statistics = () => {
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
                    <Heading size={'md'}>Statistics</Heading>
                </Flex>
                <Flex flexDirection={isOneLineMode?'row':'column'} justifyContent={isOneLineMode?'center':'normal'}>
                    <Card margin={'10px'} style={styles.statCard}>
                        <Flex flexDirection={'column'} overflowY={'auto'} padding={'24px'} >
                            <Flex flexDirection={'column'} overflowY={'auto'}>
                                <Flex justifyContent={'space-between'} flexDirection={'column'} alignItems={'flex-start'}>
                                    <Heading size={'2xl'} color={'black'}> PLFY Price</Heading>
                                    <Heading size={'lg'} color={'poolify.400'}>0.0041 $</Heading>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Card>
                    <Flex flexDirection={'column'} justifyContent={'normal'} flex={'0 0 50%'}>
                        <Card margin={'10px'} style={styles.statCard}>
                            <Flex flexDirection={'column'} overflowY={'auto'} padding={'24px'} >
                                <Flex flexDirection={'column'} overflowY={'auto'}>
                                    <Flex justifyContent={'space-between'} flexDirection={'column'} alignItems={'flex-start'}>
                                        <Heading size={'md'} color={'black'}> Ecosystem TVL</Heading>
                                        <Text>300.000,456 $</Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Card>
                        <Card margin={'10px'} style={styles.statCard}>
                            <Flex flexDirection={'column'} overflowY={'auto'} padding={'24px'} >
                                <Flex flexDirection={'column'} overflowY={'auto'}>
                                    <Flex justifyContent={'space-between'} flexDirection={'column'} alignItems={'flex-start'}>
                                        <Heading size={'md'} color={'black'}> Governance</Heading>
                                        <Text>No open proposition</Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Card>
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    );
};

export default Statistics;
