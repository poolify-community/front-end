import React, { memo, useCallback, useMemo, useState } from 'react';
import { getSingleAssetSrc } from 'libs/helpers/getSingleAssetSrc';
import { allNetworks } from 'libs/helpers/networkPicklist';
import {
  Flex,
  Img,Button,Text,
  Menu,MenuButton,MenuList,MenuItem
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

const NetworksToggle = memo(function () {
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
          <MenuButton isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />} w={'200px'}>
            {isOpen ? 'Select Network' : (
              <Flex alignItems={'center'}>
                <Img src={getSingleAssetSrc(network.asset).default} alt={`${currentNetwork.name}`} style={styles.icon} />
                <Text ml={'10px'}>{currentNetwork.name}</Text>
              </Flex>
            )}
          </MenuButton>
          <MenuList>
            {allNetworks.map((network, key) => (
              <MenuItem onClick={() => handleNetworkClick(network)} key={key}>
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
