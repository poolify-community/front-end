import { Skeleton } from '@chakra-ui/react';
import Blockies from "react-blockies";
import { useConnectWallet, useDisconnectWallet } from 'libs/hooks/useConnector';

/**
 * Shows a blockie image for the provided wallet address
 * @param {*} props
 * @returns <Blockies> JSX Elemenet
 */

function Blockie(props) {
  const { connectWallet, web3, address, networkId, connected } = useConnectWallet();
  if (!props.address && (!address || !connected))
    return <Skeleton.Avatar active size={40} />;

  return (
    <Blockies
      seed={
        props.currentWallet
          ? address.toLowerCase()
          : props.address.toLowerCase()
      }
      className="identicon"
      {...props}
    />
  );
}

export default Blockie;
