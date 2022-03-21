import { Divider, Flex, VStack,Box, useColorModeValue } from '@chakra-ui/react';
const PageLayout = (props) => {
    return (
        <VStack
            w="100%"
            h="100%"
            spacing="0"
        >
            <Flex
                pr={{ base: '10px', xlp1: '100px' }}
                pl={{ base: '10px', xlp1: '100px' }}
                h="100%"
                w="100%"
                overflowY="scroll"
                css={{
                    '&::-webkit-scrollbar': {
                        display: 'none !important',
                    },
                }}
                justifyContent={{ base: 'space-between', '2xl': 'center' }}
                //justifyContent="center"
                position="relative"
            >
                <VStack w={{ sm:'100VW', base: '750px', xl: '1200px' }}>
                <Box
                    w={'full'}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    p={6}
                    mt={'50px'}
                    textAlign={'center'}
                >
                    {props.header}
                    <Divider m="0 !important" />
                    {props.body}
                </Box>
                    
                </VStack>
            </Flex>
        </VStack>
    );
};

export default PageLayout;
