import { Box, Flex, Heading, Text,Button,Image, Link } from '@chakra-ui/react';
import Card from 'components/Card/Card';


const CustomMessage1 = () => {

    return (
        <Card mt={'50px'} padding="24px" maxWidth={'800px'}>
            <Flex w="100%" direction="column">
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
                    <Heading size={'md'}>Instructions</Heading>
                </Flex>
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
                                    color={'black'}
                                    mb={{ base: '12px', lg: 'unset' }}
                                    pl={{ base: '10px', lg: 'unset' }}
                                >
                                    Time to test our protocol on the BSC Test
                                </Heading>
                                <Heading
                                    mt="20px"
                                    color={'black'}
                                    pl={{ base: '10px', lg: 'unset' }}
                                    fontSize="16px"
                                >
                                    Objective:
                                </Heading>

                                <Text
                                    mt="24px"
                                    pl={{ base: '10px', lg: 'unset' }}
                                    color={'black'}
                                    fontSize="14px"
                                >
                                    Test the main DEFI protocol with the PLFY liquidity vault and the PLFY Maxi Vault.
                                    We also would like to test the "Claim Bounty" to see if everything is working like expected.
                                </Text>
                                <Text
                                    mt="24px"
                                    pl={{ base: '10px', lg: 'unset' }}
                                    color={'black'}
                                    fontSize="14px"
                                >
                                    To proceed for testing, please check our medium article :
                                </Text>
                                <Flex justifyContent={'center'}>
                                    <Button colorScheme='blue' size='lg' height='40px' mt={'10px'} width={'50%'} onClick={() => {
                                            window.open('https://medium.com/@poolify.finance/poolify-betatest-protocol-f48021a5e543');
                                        }}>Go to Medium</Button>
                                </Flex>
                                <Heading
                                    mt="20px"
                                    color={'black'}
                                    pl={{ base: '10px', lg: 'unset' }}
                                    fontSize="16px"
                                >
                                    Feedback:
                                </Heading>
                                <Text
                                    mt="24px"
                                    color={'black'}
                                    pl={{ base: '10px', lg: 'unset' }}
                                    fontSize="14px"
                                >
                                    For feedback, please try to reach us on discord.
                                </Text>
                            
                            </Flex>
                        </Flex>
                    </Box>
                </Flex>
            </Flex>
        </Card>
    );
};

export default CustomMessage1;
