
import { Divider,Box, Flex, VStack, useColorModeValue } from '@chakra-ui/react';
const AppLayout = (props) => {
    return (
        
        <VStack
            w="100%"
            h="100%"
            minHeight={'100vh'}
            //bg={'#eaf3fc'}//#fbfbfd
            spacing="0"
        >
            <Flex position={'fixed'} w={'100%'} className="appLayout-header" zIndex={'200'}>
                {props.header}
            </Flex>
            <Flex as="main" w={'100%'} marginTop={'100px!important'} className="appLayout-body" flexDirection={'column'}>
                {props.body}
            </Flex>
        </VStack>
    );
};

export default AppLayout;

    