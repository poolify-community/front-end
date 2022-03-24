import {
  Box,
  Flex,
  Heading,
  Stack
} from '@chakra-ui/react';
import { useBreakpointValue } from '@chakra-ui/media-query';
  
// Layout + Header
import PageLayout from 'layouts/PageLayout';
import Header from 'components/Header/Header';
  
// Components 
import GeneratePLFY from 'features/BetaTest/components/GeneratePLFY/GeneratePLFY';
import CustomMessage1custom from 'features/BetaTest/components/CustomMessage1';

function BetaTest() {
  
    const isOneLineMode = useBreakpointValue({ base: false, xl: true });
    return (
      <PageLayout 
        header={
          <Header
              title={
                  <>
                      <Flex spacing="20px" justifyItems={'center'} justifyContent={'space-between'} 
                        flexDirection={isOneLineMode?'row':'column'}
                      >
                          <Heading size={'4xl'} color={'black'}> Beta Test </Heading>
                          {/* <NetworksToggle></NetworksToggle> */}
                          <GeneratePLFY />
                      </Flex>
                  </>
              }
              subtitle=""
          />
        }
        body={
          <Stack w="100%">
              {/* <Filters /> */}
              <Box h="10px" />
              <Flex>
                <CustomMessage1custom />
              </Flex>
          </Stack>
        }
      />
    );
}
  
export default BetaTest;