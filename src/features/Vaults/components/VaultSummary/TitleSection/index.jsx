import {
    Box,
    Text,
    Flex,
    GridItem,
    Heading,
} from "@chakra-ui/react";

import DoubleTokenIcon from 'components/Icons/DoubleTokenIcon';
import SingleTokenIcon from 'components/Icons/SingleTokenIcon';


export default function({vault,...props}){
    const {tokenA,tokenB,name,stratType} = vault;
    return (
        <Flex w='300px' h='70px' ml={'30px'}>
            <Flex alignItems={'center'} justifyContent={'center'} h='inherit'>

                {tokenB && (
                    <DoubleTokenIcon
                      tokenA={tokenA}
                      tokenB={tokenB}
                  />
                )}

                {!tokenB && (
                    <SingleTokenIcon
                      tokenA={tokenA}
                  />
                )}  
                
                <Box marginLeft={'15px'}>
                  <Heading as='h3' size={{ sm:'md', base: 'md'}}>{name}</Heading>
                  {stratType && (
                    <Text size="">Strat: {stratType}</Text>
                  )}
                 
                </Box>
                
            </Flex>
        </Flex>
      );
}