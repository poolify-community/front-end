import {
    Box,
    Text,
    Flex,
    GridItem,
    Heading,
} from "@chakra-ui/react";

export default function({value,...props}){
    return (
        <GridItem w='100%' h='70px'>
            <Flex alignItems={'center'} justifyContent={'center'} h='inherit'>
                <Box marginLeft={'15px'}>
                  <Heading size={'xs'}>Wallet</Heading>
                  <Text>{value}</Text>
                </Box>
            </Flex>
        </GridItem>
      );
}