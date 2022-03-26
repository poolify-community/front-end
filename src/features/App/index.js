import React,{ useEffect,useCallback,useState } from "react";
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import {
  Flex
} from "@chakra-ui/react";
import { useTranslation } from 'react-i18next';
// Components
import Navbar from 'components/Navbar/Navbar';
import {NetworkConnectNotice} from 'components/NetworkConnectNotice/NetworkConnectNotice';

// Views
//import Home from 'views/Home/Home';
import Dashboard from 'features/Dashboard';
import Vaults from 'features/Vaults';
import BetaTest from 'features/BetaTest';
//import CrowdNFT from 'views/CrowdNFT/CrowdNFT';
// Icons
import {HomeIcon} from "components/Icons/Icons";
import AppLayout from 'layouts/AppLayout';

import { useConnectWallet, useDisconnectWallet } from 'libs/hooks/useConnector';
import { createWeb3Modal,initializePriceCache } from 'libs/web3';


// CSS
import './App.css';
import "./index.css";


const Center = (
  <Routes>
      <Route path="/"  element={<Dashboard />}/>
      {/* <Route path="/vaults"  element={<Vaults />}/> */}
      <Route path="/vaults"  element={<Vaults />}/>
      <Route path="/BetaTest"  element={<BetaTest />}/>
      {/* <Route path="/nft-pool"  element={<CrowdNFT />}/> */}
  </Routes>
);


var routes = [
  {
    path: "/",
    name: "Dashboard",
  },
  {
    path: "/vaults",
    name: "Vaults",
  },
  {
    path: "/BetaTest",
    name: "BetaTest",
  }
];




function App() {
  const { t } = useTranslation();
  const { connectWallet, web3, address, networkId, connected } = useConnectWallet();
  const { disconnectWallet } = useDisconnectWallet();
  const [web3Modal, setModal] = useState(null);


  initializePriceCache();

  useEffect(() => {
    setModal(createWeb3Modal(t));
  }, [setModal,t]);

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


  
  return (
    <AppLayout 
        header={
          <Navbar 
            routes={routes} 
            address={address}
            connected={connected}
            connectWallet={connectWalletCallback}
            disconnectWallet={disconnectWalletCallback}
          />
        }
        body={(
          <Flex flexDir={'column'}>
            <Flex justifyContent={'center'} >
              <NetworkConnectNotice 
                web3={web3}
                address={address}
                connectWallet={connectWalletCallback}
                disconnectWallet={disconnectWalletCallback}
                networkId={networkId}
              />
            </Flex>
                {networkId === window.REACT_APP_NETWORK_ID ? Center : null}
          </Flex>
        )}
    />
  );
}

export default App;
