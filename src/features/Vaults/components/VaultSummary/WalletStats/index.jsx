import {
    Box,
    Text,
    Flex,
    GridItem,
    Heading,
} from "@chakra-ui/react";

const wallet = function({value,...props}){
    return (
        <GridItem w='150px' h='70px'>
            <Flex alignItems={'center'} justifyContent={'center'} h='inherit'>
                <Box marginLeft={'15px'}>
                  <Heading size={'xs'}>Wallet</Heading>
                  <Text>{value}</Text>
                </Box>
            </Flex>
        </GridItem>
      );
}

export default wallet;