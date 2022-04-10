import React, { memo, useCallback, useMemo, useState } from 'react';
import { getSingleAssetSrc } from 'libs/helpers/getSingleAssetSrc';
import { allNetworks } from 'libs/helpers/networkPicklist';
import {
  Flex,
  Img,Button,Text,
  Menu,MenuButton,MenuList,MenuItem,useBreakpointValue
} from '@chakra-ui/react';
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';

const styles = {
  network: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width:"100%",
    minWidth:'100px',
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "20px 5px",
    cursor: "pointer",
  },
  icon: {
    alignSelf: "center",
    fill: "rgb(40, 13, 95)",
    flexShrink: "0",
    height: "30px",
  },
};

const NetworksToggle = memo(function ({width}) {

  const isOneLineMode = useBreakpointValue({ base: false, xl: true });
  const currentNetwork = useMemo(
    () => allNetworks.find(network => network.id === window.REACT_APP_NETWORK_ID),
    []
  );
  
  const handleNetworkClick = useCallback(
    network => {
      console.log('----> network',network);
      if (network.id === currentNetwork.id) {
       
      } else {
        window.location.hash = network.hash;
        window.location.reload();
      }
    },
    [currentNetwork]
  );



  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />} 
            w={isOneLineMode?width:'100%'} height={'42px'} bg={'transparent'}
            _hover={{ bg: 'poolify.400'}}
            _expanded={{ bg: 'poolify.400'}}
          >
            {isOpen ? 'Select Network' : (
              <Flex alignItems={'center'}>
                <Img src={getSingleAssetSrc(currentNetwork.asset).default} alt={`${currentNetwork.name}`} style={styles.icon} />
                <Text ml={'10px'}>{currentNetwork.name}</Text>
              </Flex>
            )}
          </MenuButton>
          <MenuList bg={'dark'} borderColor={'dark'}>
            {allNetworks.map((network, key) => (
              <MenuItem onClick={() => handleNetworkClick(network)} key={key} _hover={{bg:'poolify.400'}} _focus={{bg:'poolify.400'}}>
                <Img src={getSingleAssetSrc(network.asset).default} alt={`${currentNetwork.name}`} style={styles.icon} />
                <Text ml={'10px'}>{network.name}</Text>
              </MenuItem>
            ))}
          </MenuList>
        </>
      )}
    </Menu>
  )
});

export default NetworksToggle;
