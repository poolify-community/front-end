import React from 'react';
import { useToast,Box, Button,Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { networkSettings } from 'libs/helpers/networkSetup';

export const customHashAlert = (networkId,transaction) => {
  return (
    <Link href={`${networkSettings[networkId].blockExplorerUrls}/tx/${transaction}`} isExternal variant={'poolify-links-white'}>
      See transaction <ExternalLinkIcon mx='2px' />
    </Link>
  )
}

export const useNotifier = () => {
    const toast = useToast();
    const notifications = {};
    const toastIdRef = React.useRef();
  
    function DisplayNotification({key,title,message,status,duration = 2000}) {

      const settings = {
        title:title?title:'Transaction',
        description:message,
        status:status,
        isClosable:true,
        position:'bottom-right',
        duration:duration
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
  