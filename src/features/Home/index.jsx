import {
    Box,Text,Link,VStack,Code,Grid,HStack,Heading,Flex,
    useColorModeValue,SimpleGrid
  } from '@chakra-ui/react';
import { useBreakpointValue } from '@chakra-ui/media-query';

// Layout + Header
import PageLayout from 'layouts/PageLayout';
import Header from 'components/Header/Header';

// Components 
import Statistics from 'features/Home/components/Statistics';
import Protocol from 'features/Home/components/Protocol';
import RoadMap from 'features/Home/components/RoadMap';
import Card from 'components/Card/Card';
import CustomCard from 'components/CustomCard/CustomCard';

//#fbfbfd
//
function Home() {
  
    const isOneLineMode = useBreakpointValue({ base: false, xl: true });
    return (
      <PageLayout 
        header={
          <Header
              title={
                  <>
                    <Card padding={'20px'} variant={'poolifyBackground'}>
                      <Flex spacing="20px" justifyItems={'center'} justifyContent={'space-evenly'} 
                        flexDirection={isOneLineMode?'row':'column'} 
                      >
                          <Protocol />
                      </Flex>
                    </Card>
                  </>
              }
              subtitle=""
          />
        }
        body={
          <Flex maxWidth={'1200px'}
            flexDirection={isOneLineMode?'row':'column'} alignItems={isOneLineMode?'flex-start':'center'}
            justifyContent={'center'} 
          >
            
            <Statistics />
            <RoadMap />
          </Flex>
        }
      />
    );
}
  
export default Home;