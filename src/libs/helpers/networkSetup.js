export const networkSettings = {
  56: {
    chainId: `0x${parseInt(56, 10).toString(16)}`,
    chainName: 'BSC Mainnet',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed.binance.org'],
    blockExplorerUrls: ['https://bscscan.com/'],
  },
  97: {
    chainId: `0x${parseInt(97, 10).toString(16)}`,
    chainName: 'BSC Testnet',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed.binance.org'],
    blockExplorerUrls: ['https://testnet.bscscan.com/'],
  },
  1337: {
      chainId: `0x${parseInt(1337, 10).toString(16)}`,
      chainName: 'Local',
      nativeCurrency: {
        name: 'Binance Coin',
        symbol: 'BNB',
        decimals: 18,
      },
      rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
      blockExplorerUrls: ['https://bscscan.com/'],
  },
};
  
export const networkSetup = chainId => {
  return new Promise((resolve, reject) => {
    const provider = window.ethereum;
    if (provider) {
      if (networkSettings.hasOwnProperty(chainId)) {
        provider
          .request({
            method: 'wallet_addEthereumChain',
            params: [networkSettings[chainId]],
          })
          .then(resolve)
          .catch(reject);
      } else {
        reject(new Error(`No network settings configured for chainId: '${chainId}'`));
      }
    } else {
      reject(new Error(`window.ethereum is '${typeof provider}'`));
    }
  });
};
  
export const getRpcUrl = () => {
  const settings = networkSettings[window.REACT_APP_NETWORK_ID];
  return settings.rpcUrls[~~(settings.rpcUrls.length * Math.random())];
};
  