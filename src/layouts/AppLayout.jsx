
import { Divider,Box, Flex, VStack, useColorModeValue } from '@chakra-ui/react';
const AppLayout = (props) => {
    return (
        
        <VStack
            w="100%"
            h="100%"
            minHeight={'100vh'}
            bg={useColorModeValue('#fbfbfb', '#140E28')}
            spacing="0"
        >
            <Flex position={'fixed'} w={'100%'} className="appLayout-header" zIndex={'200'}>
                {props.header}
            </Flex>
            <Flex as="main" marginTop={'100px!important'} className="appLayout-body">
                {props.body}
            </Flex>
        </VStack>
    );
};

export default AppLayout;

    