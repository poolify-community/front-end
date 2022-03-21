import {
    Box,
    Text,
    Flex,
    GridItem,
    Heading
} from "@chakra-ui/react";
import { useBreakpointValue } from '@chakra-ui/media-query';
import DoubleTokenIcon from 'components/Icons/DoubleTokenIcon';
import SingleTokenIcon from 'components/Icons/SingleTokenIcon';


const TitleSection = function({vault,...props}){
    const isOneLineMode = useBreakpointValue({ base: false, lg: true });
    const {tokenA,tokenB,name,stratType} = vault;


    const mobileTitle = (
      <Flex w='300px' h='70px' ml={'7px'}>
            <Flex justifyContent={'center'} alignItems="center" h='inherit'>

                {tokenB && (
                    <DoubleTokenIcon
                      tokenA={tokenA}
                      tokenB={tokenB}
                      size='sm'
                  />
                )}

                {!tokenB && (
                    <SingleTokenIcon
                      tokenA={tokenA}
                      size='md'
                  />
                )}  
                
                <Box marginLeft={'7px'} textAlign={'left'}>
                  <Heading as='h3' size={{ sm:'md', base: 'md'}}>{name}</Heading>
                  {stratType && (
                    <Text size="">Strat: {stratType}</Text>
                  )}
                 
                </Box>
                
            </Flex>
        </Flex>
    );

    const desktopTitle = (
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
                      size='md'
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


    return isOneLineMode?desktopTitle:mobileTitle;
}

export default TitleSection;