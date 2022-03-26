import { useBreakpointValue } from "@chakra-ui/react";
import NavbarDesktop from './components/NavbarDesktop/NavbarDesktop';
import NavbarMobile from './components/NavbarMobile/NavbarMobile';

export default function Navbar({routes,address,connected,connectWallet,disconnectWallet,...props}) {
  const isOneLineMode = useBreakpointValue({ base: false, xl: true });


  return (
    <>
      {isOneLineMode?
      <NavbarDesktop 
        routes={routes} 
        address={address}
        connected={connected}
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}/>
        :
      <NavbarMobile 
        routes={routes} 
        address={address}
        connected={connected}
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}/>
      }
    </>
  );
}