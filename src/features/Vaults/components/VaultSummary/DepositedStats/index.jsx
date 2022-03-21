import {
    Box,
    Text,
    Flex,
    GridItem,
    Heading,
} from "@chakra-ui/react";
import { useBreakpointValue } from '@chakra-ui/media-query';


const deposited = function({value,...props}){
    const isOneLineMode = useBreakpointValue({ base: false, lg: true });


    return (
        <GridItem w={isOneLineMode?'150px':'auto'} h='70px'>
            <Flex alignItems={'center'} justifyContent={'center'} h='inherit'>
                <Box marginLeft={'15px'}>
                  <Heading size={'xs'}>Deposited</Heading>
                  <Text>{value}</Text>
                </Box>
            </Flex>
        </GridItem>
      );
}

export default deposited;