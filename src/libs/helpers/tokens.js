import {
    Box,
    Tooltip,
    Flex
} from "@chakra-ui/react";
import SingleTokenIcon from 'components/Icons/SingleTokenIcon';
import DoubleTokenIcon from 'components/Icons/DoubleTokenIcon';
import {InformationIcon} from 'components/Icons/Icons';

export const getIconElement = (item,size = 'sm') => {
    if(item.tokenB){
        return (
            <DoubleTokenIcon
                  tokenA={item.tokenA}
                  tokenB={item.tokenB}
                  size={size}
              />
        );
    }else{
        return (
            <SingleTokenIcon
                tokenA={item.tokenA}
                size={size}
            />
        );
    }
}

export const getLPName = (item) => {
    if(item.tokenB){
        return `Token: ${item.tokenA} - ${item.tokenB}`;
    }else{
        return `Token: ${item.tokenA}`;
    }
}

export const getLPElement = (item) => {
    return (
        <Box paddingRight={'20px'}>
            <Tooltip label={getLPName(item)}>
               <Flex alignItems={'flex-end'}> 
                   <InformationIcon ml={'5px'}/>
                </Flex>
            </Tooltip>
        </Box>
    );
}