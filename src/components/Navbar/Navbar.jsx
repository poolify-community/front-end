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
  InputGroup,
  InputLeftElement,
  Input,
  Text,
  Link,
  Tabs,
  TabList,
  Tab,
  Spacer,
  useBreakpointValue
} from "@chakra-ui/react";
import {
  AiOutlineMenu,
  AiFillHome,
  AiOutlineInbox,
  AiOutlineSearch,
  AiFillBell,
} from "react-icons/ai";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import Account from 'components/Account/Account';
import { NavLink, useLocation } from "react-router-dom";
import NetworksToggle from 'components/NetworksToggle/NetworksToggle';


export default function Navbar(props) {
  const isOneLineMode = useBreakpointValue({ base: false, xl: true });
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();


  // to check for active links and opened collapses
  let location = useLocation();
  
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };

  const displayButtons = (routes) => {
    //console.log('displayButtons --> ');
    let activeColor   = useColorModeValue("poolify.400", "white");
    let inactiveColor = useColorModeValue("gray.600", "gray.500");

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

  const MobileMenu = (
    <Box display={{ base: "inline-flex", md: "none" }}>
      <IconButton
        display={{ base: "flex", md: "none" }}
        aria-label="Open menu"
        fontSize="20px"
        color={useColorModeValue("gray.800", "inherit")}
        variant="ghost"
        icon={<AiOutlineMenu />}
        onClick={mobileNav.onOpen}
      />
      <VStack
        pos="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        display={mobileNav.isOpen ? "flex" : "none"}
        flexDirection="column"
        justifyContent={'space-between'}
        p={2}
        pb={4}
        m={2}
        bg={bg}
        spacing={3}
        rounded="sm"
        shadow="sm"
      >

        <Flex width={'100%'} flexDirection={'column'}>
          <Flex width={'100%'} padding={'8px'}>
            <NetworksToggle></NetworksToggle>
            <Spacer/>
            <Account />
          </Flex>
          <Flex width={'100%'} alignItems={'center'} flexDirection={'column'} pt={'50px'}>
            {displayButtons(props.routes)}
          </Flex>
        </Flex>

        <CloseButton
            color={useColorModeValue("poolify.400", "white")}
            pb={'50px'}
            size={'2xl'}
            aria-label="Close menu"
            justifySelf="self-start"
            onClick={mobileNav.onClose}
          />
      </VStack>
    </Box>
  );
  

  
  const DesktopUserMenu = (
    <>
      <HStack spacing={3} display={{ base: "none", md: "inline-flex" }}>
        <NetworksToggle></NetworksToggle>
        <Account />
      </HStack>
    </>
  )
  const DesktopMenu = (
    <> 
      <HStack spacing={3} display={{ base: "none", md: "inline-flex" }}>
        {displayButtons(props.routes)}
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
        borderColor="gray.600"
        borderBottomWidth={1}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <HStack spacing={4} display="flex" alignItems="center">
            {MobileMenu}
            {LogoAndTitle}
          </HStack>
          <HStack spacing={3} display="flex" alignItems="center">
            {DesktopMenu}
          </HStack>
          <HStack spacing={3} display="flex" alignItems="center">
            {DesktopUserMenu}
          </HStack>
        </Flex>
      </chakra.header>
      {/* {SubMenu} */}
    </Box>
  );
}