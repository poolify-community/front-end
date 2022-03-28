import {
    Box,Text,Link,VStack,Code,Grid,HStack,Heading,Flex,
    useColorModeValue
  } from '@chakra-ui/react';
import { useBreakpointValue } from '@chakra-ui/media-query';

// Layout + Header
import PageLayout from 'layouts/PageLayout';
import Header from 'components/Header/Header';

// Components 
import Statistics from 'features/Home/components/Statistics';
import Protocol from 'features/Home/components/Protocol';
import RoadMap from 'features/Home/components/RoadMap';


function Home() {
  
    const isOneLineMode = useBreakpointValue({ base: false, xl: true });
    return (
      <PageLayout 
        header={
          <Header
              title={
                  <>
                      <Flex spacing="20px" justifyItems={'center'} justifyContent={'space-evenly'} 
                        flexDirection={isOneLineMode?'row':'column'} 
                      >
                          <Protocol />
                      </Flex>
                  </>
              }
              subtitle=""
          />
        }
        body={
          <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
            <Statistics />
            <RoadMap />
          </Flex>
        }
      />
    );
}
  
export default Home;