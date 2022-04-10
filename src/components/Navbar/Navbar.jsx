import { chakra,useStyleConfig,useBreakpointValue } from "@chakra-ui/react";
import NavbarDesktop from './components/NavbarDesktop/NavbarDesktop';
import NavbarMobile from './components/NavbarMobile/NavbarMobile';

export default function Navbar({routes,address,connected,connectWallet,disconnectWallet,...props}) {
  const { size,children, variant, ...rest } = props;
  const isOneLineMode = useBreakpointValue({ base: false, xl: true });
  
  const _sx = useStyleConfig('Navbar', { size, variant });

  return (
    <>
      {isOneLineMode?
      <NavbarDesktop sx={_sx}
        routes={routes} 
        address={address}
        connected={connected}
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}/>
        :
      <NavbarMobile sx={_sx}
        routes={routes} 
        address={address}
        connected={connected}
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}/>
      }
    </>
  );
}