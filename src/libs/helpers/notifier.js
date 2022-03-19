import React from 'react';
import { useToast } from '@chakra-ui/react';

export const useNotifier = () => {
    const toast = useToast();
    const notifications = {};
    const toastIdRef = React.useRef();
  
    function DisplayNotification({key,message,status,duration = 2000}) {

      const settings = {
        title:message,
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
  