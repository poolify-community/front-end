import {
    chakra,Box,Flex,
    useColorModeValue,Img,
    VisuallyHidden,
    HStack,Button,useDisclosure,IconButton,Spacer,
    Drawer,DrawerOverlay,DrawerCloseButton,DrawerHeader,DrawerBody,DrawerContent
  } from "@chakra-ui/react";
  import {
    AiOutlineMenu,
  } from "react-icons/ai";
  import React from 'react';

  import Account from 'components/Account/Account';
  import { NavLink, useLocation } from "react-router-dom";
  import NetworksToggle from 'components/NetworksToggle/NetworksToggle';
  
  
  export default function NavbarMobile({address,connected,connectWallet,disconnectWallet,...props}) {
    const bg = useColorModeValue("white", "gray.800");
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

  
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
                onClick={onClose}
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
        >
          <Flex alignItems="center" justifyContent="space-between" mx="auto">
            <HStack spacing={4} display="flex" alignItems="center">
              <chakra.a
                href={`${process.env.PUBLIC_URL}/#/`}
                title="Choc Home Page"
                display="flex"
                alignItems="center"
              >
                <Img src="/assets/img/Poolify-Logo-Color.png" width='50px' height='50px' margin={'10px'} />
                <VisuallyHidden>Poolify Finance</VisuallyHidden>
              </chakra.a>
              <chakra.h1 fontSize="xl">Poolify Finance</chakra.h1>
            </HStack>
            <Box display={{ base: "inline-flex", md: "none" }}>
                <IconButton
                  display={{ base: "flex", md: "none" }}
                  aria-label="Open menu" fontSize="20px"
                  color={'gray.800'} variant="ghost"
                  icon={<AiOutlineMenu />}
                  onClick={onOpen}
                />
              </Box>
          </Flex>
        </chakra.header>
        

      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Poolify Finance</DrawerHeader>
          <DrawerBody>
            <Flex width={'100%'} flexDirection={'column'}>
              <Flex width={'100%'} padding={'8px'} flexDirection={'column'}>
                <NetworksToggle></NetworksToggle>
                <Spacer/>
                <Account 
                  address={address}
                  connected={connected}
                  connectWallet={connectWallet}
                  disconnectWallet={disconnectWallet}
                />
              </Flex>
              <Flex width={'100%'} alignItems={'flex-start'} flexDirection={'column'} pt={'50px'}>
                {DisplayButtons(props.routes)}
              </Flex>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      </Box>
    );
  }