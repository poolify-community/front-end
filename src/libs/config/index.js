import { addressBook } from 'blockchain-addressbook';

const {
    bsc: bscAddressBook
} = addressBook;
export {
  bscAddressBook
};

export {
  vaultABI,
  bnbVaultABI,
  erc20ABI,
  strategyABI,
  multicallABI,
  govPoolABI,
  beefyUniV2ZapABI,
  uniswapV2PairABI,
  uniswapV2RouterABI,
  launchPoolABI,
} from './abi';

export { bscPools } from './vault/bsc_pools';
//export { bscZaps } from './zap/bsc_zaps';

export { bscTestNetPools } from './vault/bsctestnet_pools';
//export { bscZaps } from './zap/bsc_zaps';


export { localPools } from './vault/local_pools';
//export { localZaps } from './zap/local_zaps';

export { nativeCoins } from './native_coins';
