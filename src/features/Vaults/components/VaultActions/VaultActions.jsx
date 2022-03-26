import {
    Text,
    useColorModeValue,
    Box,
    Flex,
    useBreakpointValue,
    Tabs,Tab,TabList,TabPanels,TabPanel,
} from "@chakra-ui/react";

import Deposit from './Deposit/Deposit';
import Withdraw from "./Withdraw/Withdraw";



const MobileVersion = ({ vault, balanceSingle, index, sharesBalance,...props}) => {

    return (
        <Box
            border={"2px solid"} borderColor={'rgb(238, 234, 244)'}
            borderRadius={{sm:'0px',base:'16px'}}
            spacing="10px" flexShrink={0} ml={{'sm':'0px','base':'32px'}} mr={'0px'} 
            justifyContent="space-between" 
            {...props}
        >
            <Tabs>
                <TabList>
                    <Tab>
                        <Text fontWeight={'600'} fontSize={'lg'} color={'poolify.400'}>
                            {t('Vault-DepositButton')}
                        </Text>
                    </Tab>
                    <Tab>
                        <Text fontWeight={'600'} fontSize={'lg'} color={'poolify.400'}>
                            {t('Vault-WithdrawButton')}
                        </Text>
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Deposit index={index} vault={vault}/>
                    </TabPanel>
                    <TabPanel>
                        <Withdraw index={index} vault={vault} sharesBalance={sharesBalance}/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

const DesktopVersion = ({ vault, balanceSingle, index, sharesBalance,...props}) => {

    return (
        <>
        
        <Box
            border={"2px solid"} borderColor={'rgb(238, 234, 244)'}
            borderRadius={{base:'0px',md:'16px'}}
            spacing="10px"  ml={{base:'0px',md:'20px'}} mr={'0px'} 
            justifyContent="space-between" 
        >
            <Deposit index={index} vault={vault}/>
        </Box>
        <Box
            border={"2px solid"} borderColor={'rgb(238, 234, 244)'}
            borderRadius={{base:'0px',md:'16px'}}
            spacing="10px"  ml={{base:'0px',md:'20px'}} mr={{base:'0px',md:'20px'}} 
            justifyContent="space-between" 
        >
            <Withdraw index={index} vault={vault} sharesBalance={sharesBalance}/>
        </Box>
        </>
    )
}


export default ({ vault, balanceSingle, index, sharesBalance,...props}) => {
    const isOneLineMode = useBreakpointValue({ base: false, xl: true });
    if(isOneLineMode){
        return DesktopVersion({ vault, balanceSingle, index, sharesBalance,...props});
    }else{
        return MobileVersion({ vault, balanceSingle, index, sharesBalance,...props});
    }
};