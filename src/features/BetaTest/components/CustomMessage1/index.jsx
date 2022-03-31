import { Box, Flex, Heading, Text,Button,Image, Link } from '@chakra-ui/react';
import Card from 'components/Card/Card';


const CustomMessage1 = () => {

    return (
        <Card mt={'10px'} variant={'none'} maxWidth={'800px'}>
            <Flex w="100%" direction="column">
                <Heading margin={'10px'} textAlign={'left'}>Instructions</Heading>
                <Flex w="100%" overflow="hidden">
                    <Box
                        mx="auto"
                        w={{ base: '90%', lg: '960px' }}
                        p={{ base: 'unset', lg: '40px 58px 53px 48px' }}
                        pt={{ base: '40px', lg: '40px' }}
                    >
                        <Flex
                            gridArea="53px"
                            pt="10px"
                            direction={{ base: 'column', lg: 'unset' }}
                        >
                            <Flex direction="column" textAlign={'left'}>
                                <Heading size={'lg'}
                                    mb={{ base: '12px', lg: 'unset' }}
                                    pl={{ base: '10px', lg: 'unset' }}
                                >
                                    Time to test our protocol on the BSC Test
                                </Heading>
                                <Card padding={'24px'} mt={'20px'}>
                                    <Heading
                                        mt="20px"
                                        size={'md'}
                                    >
                                        Objective:
                                    </Heading>

                                    <Text
                                        mt="24px"
                                        pl={{ base: '10px'}}
                                        size={'md'}
                                        fontWeight={'semibold'}
                                    >
                                        Test the main DEFI protocol with the PLFY liquidity vault and the PLFY Maxi Vault.
                                        We also would like to test the "Claim Bounty" to see if everything is working like expected.
                                    </Text>
                                    <Text
                                        mt="24px"
                                        pl={{ base: '10px'}}
                                        size={'md'}
                                        fontWeight={'semibold'}
                                    >
                                        To proceed for testing, please check our medium article :
                                    </Text>
                                    <Flex justifyContent={'center'}>
                                        <Button variant={'poolify'} size='lg' height='40px' mt={'10px'} width={'50%'} onClick={() => {
                                                window.open('https://medium.com/@poolify.finance/poolify-betatest-protocol-f48021a5e543');
                                            }}>Go to Medium</Button>
                                    </Flex>
                                </Card>

                                <Card padding={'24px'} mt={'20px'}>
                                    <Heading
                                        mt="20px"
                                        size={'md'}
                                    >
                                        Feedback:
                                    </Heading>
                                    <Text
                                        mt="24px"
                                        pl={{ base: '10px'}}
                                        size={'md'}
                                        fontWeight={'semibold'}
                                    >
                                        For feedback, please try to reach us on discord.
                                    </Text>
                                </Card>
                            
                            </Flex>
                        </Flex>
                    </Box>
                </Flex>
            </Flex>
        </Card>
    );
};

export default CustomMessage1;
