import React from 'react';
import { chakra,useToast,Box,Flex,Icon, Button,Link,useColorModeValue } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { IoMdCheckmarkCircle,IoMdAlert } from "react-icons/io";
import { BsLightningFill } from "react-icons/bs";

import { networkSettings } from 'libs/helpers/networkSetup';


export const customHashAlert = (networkId,transaction) => {
  return (
    <Link href={`${networkSettings[networkId].blockExplorerUrls}/tx/${transaction}`} isExternal variant={'poolify-links-white'}>
      See transaction <ExternalLinkIcon mx='2px' />
    </Link>
  )
}

export const custom_toast = ({title,description,status = 'info'}) => {
  const settings = {
    'success':{icon:IoMdCheckmarkCircle,color:'green.500'},
    'info':{icon:IoMdAlert,color:'blue.500'},
    'warning':{icon:IoMdAlert,color:'yellow.400'},
    'error':{icon:BsLightningFill,color:'red.500'}
  };
  let _setting = settings.hasOwnProperty(status)?settings[status]:settings['info']
  return(
    <Flex
        maxW="sm"
        w="full"
        mx="auto"
        bg={"white"}
        shadow="md"
        rounded="lg"
        overflow="hidden"
    >
      <Flex justifyContent="center" alignItems="center" w={12} bg={_setting.color}>
        <Icon as={_setting.icon} color="white" boxSize={6} />
      </Flex>

      <Box mx={-3} py={2} px={4}>
        <Box mx={3}>
          <chakra.span
            color={_setting.color}
            fontWeight="bold"
          >
            {title}
          </chakra.span>
          <chakra.p
            color={"gray.600"}
            fontSize="sm"
          >
            {description}
          </chakra.p>
        </Box>
      </Box>
    </Flex>
  )
}

export const useNotifier = () => {
    const toast = useToast();
    const notifications = {};
    const toastIdRef = React.useRef();
  
    function DisplayNotification({key,title,message,status,duration = 2000}) {

      const settings = {
        status:status,
        isClosable:true,
        position:'bottom-right',
        duration:duration,
        render:() => (
          custom_toast({
            title:title?title:'Transaction',
            description:message,
            status:status
          })
        )
      };


      let _key = key || new Date().getTime() + Math.random();
      if(notifications[_key]){
        // Update
        toast.update(notifications[_key],settings);
      }else{
        // Insert
        notifications[_key] = toast(settings);
      }
    }
  
    return { DisplayNotification, toast};
};
  