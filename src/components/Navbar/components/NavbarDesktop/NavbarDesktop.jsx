import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  Heading
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
    let activeColor   = "poolify.400";
    let inactiveColor = "inherit";

    return routes.map((prop, key) => {
      let _url = prop.path + window.location.hash;
      return (
        <NavLink to={_url} key={key}>
          <Button key={key} 
              variant={activeRoute(prop.path) === "active" ?'navbar-selected':'navbar'}
              leftIcon={prop.leftIcon} 
              fontSize={{sm:"xl",base:'sm'}}
          >
              {prop.name}
          </Button>
        </NavLink>
      )
    })
  };


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
            <chakra.a
              href={`${process.env.PUBLIC_URL + window.location.hash}`}
              title="Home page"
              display="flex"
              alignItems="center"
            >
              <img src="/assets/img/Poolify-Logo-Color.png" style={{width:'64px',height:'64px'}} />
              <VisuallyHidden>Poolify Finance</VisuallyHidden>
              <Heading size={'lg'}>Poolify.<chakra.span fontSize={'1rem'}>Finance</chakra.span></Heading>
            </chakra.a>
          </HStack>
          <HStack spacing={3} display="flex" alignItems="center">
            <HStack spacing={3} display={{ base: "none", md: "inline-flex" }}>
              {DisplayButtons(props.routes)}
            </HStack>
          </HStack>
          <HStack spacing={2} display="flex" alignItems="center">
            <Flex spacing={2} width={'450px'} alignItems={'center'}>
              <NetworksToggle width={'300px'}></NetworksToggle>
              <Account 
                address={address}
                connected={connected}
                connectWallet={connectWallet}
                disconnectWallet={disconnectWallet}
              />
            </Flex>
          </HStack>
        </Flex>
      </chakra.header>
      {/* {SubMenu} */}
    </Box>
  );
}