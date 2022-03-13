import React from 'react';
import { useToast } from '@chakra-ui/react';

export const useNotifier = () => {
    const toast = useToast();
  
    function DisplayNotification({message,status}) {
        return (
          toast({
            title:message,
            status:status,
            isClosable:true,
            position:'top-right',
            duration:2000
          })
        )
      }
  
    return { DisplayNotification, toast};
};
  