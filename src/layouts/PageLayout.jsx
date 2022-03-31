import { Divider, Flex, VStack,Box, useColorModeValue } from '@chakra-ui/react';
const PageLayout = (props) => {
    // w={{ sm:'100VW', base: '750px', lg:'960px',xl: '1200px' }}
    return (
        <VStack
            w="100%"
            h="100%"
            spacing="0"
        >
            <Flex
                h="100%"
                overflowY="scroll"
                css={{
                    '&::-webkit-scrollbar': {
                        display: 'none !important',
                    },
                }}
                justifyContent={{ base: 'space-between', '2xl': 'center' }}
                position="relative"
            >
                <VStack >
                    <Box
                        w={'full'}
                        rounded={'lg'}
                        p={6}
                        mb={'15px'}
                        textAlign={'center'}
                    >
                        {props.header}


                        <Box mt={'10px'} 
                             pr={{ base: '10px', xlp1: '100px' }}
                             pl={{ base: '10px', xlp1: '100px' }}
                        >
                            {props.body}
                        </Box>
                        
                    </Box>
                </VStack>
            </Flex>
        </VStack>
    );
};

export default PageLayout;
