import React,{ useEffect,useCallback,useState } from "react";
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';

// Components
import Navbar from 'components/Navbar/Navbar';

// Views
//import Home from 'views/Home/Home';
import Dashboard from 'features/Dashboard';
import Vaults from 'features/Vaults';
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
      <Route path="/vaults/"  element={<Vaults />}/>
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
  }
];




function App() {
  

  const { connectWallet, web3, address, networkId, connected } = useConnectWallet();
  const { disconnectWallet } = useDisconnectWallet();
  const [web3Modal, setModal] = useState(null);


  initializePriceCache();
  /*
  useEffect(() => {
      const connectorId = window.localStorage.getItem("connectorId");
      console.log('connectorId',connectorId,isAuthenticated);
      if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
        enableWeb3({ provider: connectorId });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);
  */

  useEffect(() => {
    setModal(createWeb3Modal());
  }, [setModal]);

  useEffect(() => {
    if (web3Modal && (web3Modal.cachedProvider || window.ethereum)) {
      console.log('web3Modal.cachedProvider',web3Modal.cachedProvider);
      console.log('window.ethereum',window.ethereum);
      connectWallet(web3Modal);
    }
  }, [web3Modal, connectWallet]);

  return (
    <AppLayout 
        header={<Navbar routes={routes}/>}
        body={Center}
    />
  );
}

export default App;
