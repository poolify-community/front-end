import {
  Text,Button,Box,
  useColorModeValue,
  useBreakpointValue
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next';

import { getEllipsisTxt } from "libs/helpers/formatters";

import Blockie from "Blockie";
const styles = {
  account: {
    height: "42px",
    padding: "5px 5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(244, 244, 244)",
    cursor: "pointer",
    borderRadius : "0.75rem"
  },
  connector: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "auto",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "10px 5px",
    height: "42px",
    cursor: "pointer",
    borderRadius : "0.75rem"
  },
  icon: {
    alignSelf: "center",
    fill: "rgb(40, 13, 95)",
    flexShrink: "0",
    marginBottom: "8px",
    height: "30px",
  }
};

function Account({address,connected,connectWallet,disconnectWallet}) {
  const isOneLineMode = useBreakpointValue({ base: false, xl: true });
  const _accountTextColor = useColorModeValue('poolify.400','poolify.400');
  const { t } = useTranslation();


  //console.log('test', isAuthenticated, account, chainId);
  if (!connected || !address) {
    return (
      <>
        <Button style={styles.connector} onClick={connectWallet} bg={'gray.100'} w={'100%'} m={'5px'} mt={isOneLineMode?'':'10px'}>
          <Text
              variant="caption-bold"
              fontWeight={'bold'}
              flexShrink={0}
          > Authenticate </Text>
        </Button>
      </>
    );
  }
  
  const title = ('Account')
  /*
  const body  = (
    <Box
      borderRadius="3xl"
      border="1px"
      borderStyle="solid"
      borderColor="black"
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
            await disconnectWallet();
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
  */
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
    <Box style={styles.account}  bg={'gray.100'} w={'100%'} m={'5px'} mt={isOneLineMode?'':'10px'} onClick={disconnectWallet}>
      <Text mr={'5px'} color={_accountTextColor}>
        {getEllipsisTxt(address, 6)}
      </Text>
      <Blockie currentWallet scale={3} />
    </Box>
  );
}

export default Account;
