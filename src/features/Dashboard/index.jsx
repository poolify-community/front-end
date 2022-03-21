import {
    Box,Text,Link,VStack,Code,Grid,HStack,Heading,
    useColorModeValue
  } from '@chakra-ui/react';
  import { useBreakpointValue } from '@chakra-ui/media-query';
  
  // Layout + Header
  import PageLayout from 'layouts/PageLayout';
  import Header from 'components/Header/Header';
  
  // Components 
  
  function Dashboards() {
  
    const oneLineMode = useBreakpointValue({ base: false, xl: true });
    return (
      <PageLayout 
        header={
          <Header
              title={
                  <>
                      <HStack spacing="20px">
                          <Heading size={'3xl'}> Dashboard </Heading>
                      </HStack>
                  </>
              }
              subtitle=""
          />
        }
        body={
          <>
            Display informations related to the APP and the Community Fund in general
          </>
        }
      />
    );
  }
  
  export default Dashboards;