import {
  localPools,
  bscPools,
  bscTestNetPools
} from 'libs/config';
import { allNetworks } from 'libs/helpers/networkPicklist';



import { connectors } from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import WalletLink from 'walletlink';

const indexBy = function(array, key) {
  return Object.fromEntries(array.map(item => [item[key], item]));
}

const networkTxUrls = {
  56: hash => `https://bscscan.com/tx/${hash}`,
  97: hash => `https://testnet.bscscan.com/tx/${hash}`,
  1337: hash => `https://bscscan.com/tx/${hash}`,
};

const networkFriendlyName = {
  56: 'BSC',
  97: 'BSCTestNet',
  128: 'HECO',
  43114: 'AVAX',
  137: 'Polygon',
  250: 'Fantom',
  1666600000: 'Harmony',
  42161: 'Arbitrum',
  42220: 'Celo',
  1285: 'Moonriver',
  25: 'Cronos',
  1313161554: 'Aurora',
  122: 'Fuse',
  1088: 'Metis',
  1284: 'Moonbeam',
};

export const appNetworkId = window.REACT_APP_NETWORK_ID;

/** This will come later from the API server directly !!!  */
export const getNetworkPools = () => {
  switch (window.REACT_APP_NETWORK_ID) {
    case 1337:
      return localPools; // similar to bsc
    case 56:
      return bscPools;
    case 97:
      return bscTestNetPools;
    default:
      return [];
  }
};

export const getNetworkVaults = (networkId = appNetworkId) => {
  switch (networkId) {
    case 1337:
      return indexBy(localPools, 'id');
    case 56:
      return indexBy(bscPools, 'id');
    case 97:
      return indexBy(bscTestNetPools, 'id');
    default:
      return {};
  }
};


export const getNetworkConnectors = t => {
  switch (window.REACT_APP_NETWORK_ID) {
    case 56:
      return {
        network: 'binance',
        cacheProvider: true,
        providerOptions: {
          injected: {
            display: {
              name: 'MetaMask',
            },
          },
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              rpc: {
                1: 'https://bsc-dataseed.binance.org/',
                56: 'https://bsc-dataseed.binance.org/',
                97: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
              },
            },
          },
          'custom-math': {
            display: {
              name: 'Math',
              description: t('Math Wallet'),
              logo: require(`images/wallets/math-wallet.svg`).default,
            },
            package: 'math',
            connector: connectors.injected,
          },
          'custom-twt': {
            display: {
              name: 'Trust',
              description: t('Trust Wallet'),
              logo: require(`images/wallets/trust-wallet.svg`).default,
            },
            package: 'twt',
            connector: connectors.injected,
          },
          'custom-safepal': {
            display: {
              name: 'SafePal',
              description: t('SafePal App'),
              logo: require(`images/wallets/safepal-wallet.svg`).default,
            },
            package: 'safepal',
            connector: connectors.injected,
          },
          'custom-cb-bsc': {
            display: {
              logo: require(`images/wallets/coinbase.png`).default,
              name: 'Coinbase Wallet',
              description: t('Connect to your Coinbase Wallet'),
            },
            options: {
              appName: 'Beefy Finance',
              appLogoUrl: 'https://app.beefy.finance/static/media/BIFI.e797b2e4.png',
              darkMode: false,
            },
            package: WalletLink,
            connector: async (ProviderPackage, options) => {
              const walletLink = new ProviderPackage(options);

              const provider = walletLink.makeWeb3Provider('https://bsc-dataseed.binance.org/', 56);

              await provider.enable();

              return provider;
            },
          },
        },
    };
    case 97:
      return {
        network: 'binance',
        cacheProvider: true,
        providerOptions: {
          injected: {
            display: {
              name: 'MetaMask',
            },
          },
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              rpc: {
                1: 'https://bsc-dataseed.binance.org/',
                56: 'https://bsc-dataseed.binance.org/',
                97: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
              },
            },
          },
          'custom-binance': {
            display: {
              name: 'Binance',
              description: t('Binance Chain Wallet'),
              logo: require(`images/wallets/binance-wallet.png`).default,
            },
            package: 'binance',
            connector: async (ProviderPackage, options) => {
              const provider = window.BinanceChain;
              await provider.enable();
              return provider;
            },
          },
          'custom-math': {
            display: {
              name: 'Math',
              description: t('Math Wallet'),
              logo: require(`images/wallets/math-wallet.svg`).default,
            },
            package: 'math',
            connector: connectors.injected,
          },
          'custom-twt': {
            display: {
              name: 'Trust',
              description: t('Trust Wallet'),
              logo: require(`images/wallets/trust-wallet.svg`).default,
            },
            package: 'twt',
            connector: connectors.injected,
          },
          'custom-safepal': {
            display: {
              name: 'SafePal',
              description: t('SafePal App'),
              logo: require(`images/wallets/safepal-wallet.svg`).default,
            },
            package: 'safepal',
            connector: connectors.injected,
          },
          'custom-cb-bsc': {
            display: {
              logo: require(`images/wallets/coinbase.png`).default,
              name: 'Coinbase Wallet',
              description: t('Connect to your Coinbase Wallet'),
            },
            options: {
              appName: 'Beefy Finance',
              appLogoUrl: 'https://app.beefy.finance/static/media/BIFI.e797b2e4.png',
              darkMode: false,
            },
            package: WalletLink,
            connector: async (ProviderPackage, options) => {
              const walletLink = new ProviderPackage(options);

              const provider = walletLink.makeWeb3Provider('https://bsc-dataseed.binance.org/', 56);

              await provider.enable();

              return provider;
            },
          },
        },
    };
    default:
      return {};
  }
};

export const getNetworkTxUrl = networkTxUrls[window.REACT_APP_NETWORK_ID];
export const getNetworkFriendlyName = (networkId = window.REACT_APP_NETWORK_ID) => networkFriendlyName[networkId];
//export const getNetworkBuyUrl = (networkId = window.REACT_APP_NETWORK_ID) => networkBuyUrls[networkId];
export const getNetworkAppUrl = (networkId = window.REACT_APP_NETWORK_ID) =>
  window.location.protocol +
  '//' +
  window.location.host +
  window.location.pathname +
  '#' +
  allNetworks.find(n => n.id === networkId)?.hash;

export const vaults = getNetworkVaults();