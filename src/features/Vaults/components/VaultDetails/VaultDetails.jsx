import {Flex,useBreakpointValue} from "@chakra-ui/react";
import BigNumber from 'bignumber.js';




import VaultActions from 'features/Vaults/components/VaultActions/VaultActions';
import Links from './Links/Links';
//import { useModal } from 'providers/ModalProvider';

export default function({vault,tokens,apys,fetchBalancesDone,fetchVaultsDataDone,fetchApysDone,...props}){
    const isOneLineMode = useBreakpointValue({ base: false, xl: true });
    const sharesBalance = new BigNumber(tokens[vault.vaultToken].tokenBalance); // Vault Token Balance, might need to change the name



    return (
        <>  
            <Links vault={vault}  />

            <VaultActions alignItems={'center'} flexDirection={'row'}
                    vault={vault} sharesBalance={sharesBalance} 
            />
        </>
    )
}