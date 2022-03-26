import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  useColorMode,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  Spacer,
  useBreakpointValue
} from "@chakra-ui/react";
import {
  AiOutlineMenu,
} from "react-icons/ai";
import Account from 'components/Account/Account';
import { NavLink, useLocation } from "react-router-dom";
import NetworksToggle from 'components/NetworksToggle/NetworksToggle';


export default function NavbarDesktop({address,connected,connectWallet,disconnectWallet,...props}) {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();


  // to check for active links and opened collapses
  let location = useLocation();
  
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };

  const DisplayButtons = (routes) => {
    //console.log('DisplayButtons --> ');
    let activeColor   = useColorModeValue("poolify.400", "white");
    let inactiveColor = "black";

    return routes.map((prop, key) => {
      return (
        <NavLink to={prop.path} key={key}>
          <Button key={key} 
              variant="ghost" leftIcon={prop.leftIcon} fontSize={{sm:"xl",base:'sm'}}
              color={activeRoute(prop.path) === "active" ?activeColor:inactiveColor}
            >
              {prop.name}
          </Button>
        </NavLink>
      )
    })
  };
  

  
  const DesktopUserMenu = (
    <>
      <Flex spacing={2} width={'450px'} alignItems={'center'}>
        <NetworksToggle width={'300px'}></NetworksToggle>
        <Account 
          address={address}
          connected={connected}
          connectWallet={connectWallet}
          disconnectWallet={disconnectWallet}
        />
      </Flex>
    </>
  )
  const DesktopMenu = (
    <> 
      <HStack spacing={3} display={{ base: "none", md: "inline-flex" }}>
        {DisplayButtons(props.routes)}
      </HStack>
    </>
  )

  const LogoAndTitle = (
    <>
      <chakra.a
         href={`${process.env.PUBLIC_URL}/#/`}
        title="Choc Home Page"
        display="flex"
        alignItems="center"
      >
        <img src="/assets/img/Poolify-Logo-Color.png" style={{width:'64px',height:'64px'}} />
        <VisuallyHidden>Poolify Finance</VisuallyHidden>
      </chakra.a>
      <chakra.h1 fontSize="xl">Poolify Finance</chakra.h1>
    </>
  )


  return (
    <Box shadow="md" w={'100%'}>
      <chakra.header
        bg={bg}
        borderColor="black"
        borderBottomWidth={1}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <HStack spacing={4} display="flex" alignItems="center">
            {LogoAndTitle}
          </HStack>
          <HStack spacing={3} display="flex" alignItems="center">
            {DesktopMenu}
          </HStack>
          <HStack spacing={2} display="flex" alignItems="center">
            {DesktopUserMenu}
          </HStack>
        </Flex>
      </chakra.header>
      {/* {SubMenu} */}
    </Box>
  );
}