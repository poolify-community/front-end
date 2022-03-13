import React, { memo, useCallback, useMemo, useState } from 'react';
import { getSingleAssetSrc } from 'libs/helpers/getSingleAssetSrc';
import { allNetworks } from 'libs/helpers/networkPicklist';
import {
  Box,
  Flex,
  Text,
  Img,
  Grid
} from '@chakra-ui/react';
import { useModal } from 'providers/ModalProvider';

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
    marginBottom: "8px",
    height: "30px",
  },
};

const NetworksToggle = memo(function () {
  const { setModal,onClose } = useModal();
  const currentNetwork = useMemo(
    () => allNetworks.find(network => network.id === window.REACT_APP_NETWORK_ID),
    []
  );

  const handleClose = useCallback(() => {onClose()}, [onClose]);
  const handleOpen = useCallback(() => setModal(title,body,null), [setModal]);
  
  const handleNetworkClick = useCallback(
    network => {
      if (network.id === currentNetwork.id) {
        handleClose();
      } else {
        window.location.hash = network.hash;
        window.location.reload();
      }
    },
    [currentNetwork, handleClose]
  );

  const title = ('Select Network')
  const body  = (
    <Box
      borderRadius="3xl"
      border="1px"
      borderStyle="solid"
      borderColor="gray.600"
      px={5}
      pt={4}
      pb={2}
      mb={3}
    >
      <Flex justifyContent="space-between" alignItems="center" mb={3}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          {allNetworks.map((network, key) => (
            <Box
              _hover={{backgroundColor:'#bdbdbd',cursor:'pointer'}}
              style={styles.network}
              key={network.id}
              onClick={() => {
                handleNetworkClick(network)
              }}
            >
              <Img src={getSingleAssetSrc(network.asset).default} alt={`${currentNetwork.name}`} style={styles.icon} />
              <Text style={{ fontSize: "14px" }}>{network.name}</Text>
            </Box>
          ))}
        </div>
      </Flex>
    </Box>
  );
    
  return (
    <Box display={'inline-flex'} height={'42px'} borderRadius={'12px'} backgroundColor={'#f3f3f3'} padding={'0 16px 0 0'} alignItems={'center'} 
            _hover={{backgroundColor:'#bdbdbd',cursor:'pointer'}}
            onClick={handleOpen}
    >
        <Img
          height={'24px'} ml={'15px'}
          src={getSingleAssetSrc(currentNetwork.asset).default}
          alt={`${currentNetwork.asset} logo`}
        />
        <Flex alignItems={'center'} marginLeft={'16px'}>
          <Box width={'10px'} height={'10px'} backgroundColor={'green'} borderRadius={'50%'}/>
          <Text margin={'0 0 0 8px'} fontWeight={'bold'} color={'black'}>{currentNetwork.name}</Text>
        </Flex>
    </Box>
  );
});

export default NetworksToggle;
