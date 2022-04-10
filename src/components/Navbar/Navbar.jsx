import { chakra,useStyleConfig,useBreakpointValue } from "@chakra-ui/react";
import NavbarDesktop from './components/NavbarDesktop/NavbarDesktop';
import NavbarMobile from './components/NavbarMobile/NavbarMobile';

export default function Navbar({routes,address,connected,connectWallet,disconnectWallet,...props}) {
  const { size,children, variant, ...rest } = props;
  const isOneLineMode = useBreakpointValue({ base: false, xl: true });
  

  return (
    <>
      {isOneLineMode?
      <NavbarDesktop sx={useStyleConfig('Navbar', { size, variant })}
        routes={routes} 
        address={address}
        connected={connected}
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}/>
        :
      <NavbarMobile sx={useStyleConfig('Navbar', { size, variant })}
        routes={routes} 
        address={address}
        connected={connected}
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}/>
      }
    </>
  );
}