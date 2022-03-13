import { useEffect,useState,useCallback } from "react";
import { ExternalLinkIcon, CopyIcon } from "@chakra-ui/icons";
import {
  Flex,Link,
  Text,Button,Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useColorModeValue,
} from '@chakra-ui/react'
import { getEllipsisTxt } from "libs/helpers/formatters";
import { getExplorer } from "libs/helpers/networks";

import Blockie from "Blockie";
import Address from "components/Address/Address";

import { connectors } from "./config";
import { useModal } from 'providers/ModalProvider';

import { useConnectWallet, useDisconnectWallet } from 'libs/hooks/useConnector';
import { createWeb3Modal } from 'libs/web3';

const styles = {
  account: {
    height: "42px",
    padding: "0 15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    borderRadius: "12px",
    backgroundColor: "rgb(244, 244, 244)",
    cursor: "pointer",
  },
  connector: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "auto",
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
  }
};

function Account() {
  const { setModal } = useModal();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
  const _accountTextColor = useColorModeValue('poolify.400','poolify.400');

  const { connectWallet, web3, address, networkId, connected } = useConnectWallet();
  const { disconnectWallet } = useDisconnectWallet();
  const [web3Modal, setWeb3Modal] = useState(null);


  useEffect(() => {
    setWeb3Modal(createWeb3Modal());
  }, [setWeb3Modal]);

  useEffect(() => {
    if (web3Modal && (web3Modal.cachedProvider || window.ethereum)) {
      connectWallet(web3Modal);
    }
  }, [web3Modal, connectWallet]);

  const connectWalletCallback = useCallback(() => {
    connectWallet(web3Modal);
  }, [web3Modal, connectWallet]);

  const disconnectWalletCallback = useCallback(() => {
    disconnectWallet(web3, web3Modal);
  }, [web3, web3Modal, disconnectWallet]);


  //console.log('test', isAuthenticated, account, chainId);
  if (!connected || !address) {
    return (
      <>
        <div style={styles.connector} onClick={connectWalletCallback}>
          <Text
              variant="caption-bold"
              fontWeight={'bold'}
              flexShrink={0}
          > Authenticate </Text>
        </div>
      </>
    );
  }
  
  const title = ('Account')
  const body  = (
    <Box
      borderRadius="3xl"
      border="1px"
      borderStyle="solid"
      borderColor="gray.600"
      background={'#222528'}
      px={5}
      pt={4}
      pb={2}
      mb={3}
    >
      <Flex justifyContent="space-between" alignItems="center" mb={3}>
        <Text color="gray.400" fontSize="sm">
          Connected with MetaMask
        </Text>
        <Button
          variant="outline"
          size="sm"
          borderColor="blue.800"
          borderRadius="3xl"
          color="blue.500"
          fontSize="13px"
          fontWeight="normal"
          px={2}
          height="26px"
          _hover={{
            background: "none",
            borderColor: "blue.300",
            textDecoration: "underline",
          }}
          onClick={async () => {
            await disconnectWalletCallback();
            setIsModalVisible(false);
          }}
        >
          Disconnect
        </Button>
      </Flex>
      <Flex alignItems="center" mt={2} mb={4} lineHeight={1}>
        <Address
          avatar="left"
          size={12}
          copyable
          style={{ fontSize: "20px",color:"white",fontSize:"xl",fontWeight:"semibold" }}
        />
      </Flex>
      <Flex alignContent="center" m={3}>
        <Link
          fontSize="sm"
          display="flex"
          alignItems="center"
          href={`${getExplorer(networkId)}/address/${address}`}
          isExternal
          color="gray.400"
          ml={6}
          _hover={{
            color: "whiteAlpha.800",
            textDecoration: "underline",
          }}
        >
          <ExternalLinkIcon mr={1} />
          View on Explorer
        </Link>
      </Flex>
    </Box>
  );
  const footer = (
    <Text
      color="#222528"
      textAlign="left"
      fontWeight="medium"
      fontSize="md"
      mr={'auto'}
    >
      Your transactions will appear here...
    </Text>
  )

  return (
    <>
     
      <div style={styles.account} onClick={() => {
        disconnectWalletCallback();//setModal(title,body,footer);
      }}>
        <Text mr={'5px'} color={_accountTextColor}>
          {getEllipsisTxt(address, 6)}
        </Text>
        <Blockie currentWallet scale={3} />
      </div>
    
    </>
  );
}

export default Account;
