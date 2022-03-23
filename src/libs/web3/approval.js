import { erc20ABI } from '../config';
import BigNumber from 'bignumber.js';

export const approval = ({ web3, address, tokenAddress, contractAddress,DisplayNotification,toastId}) => {

  return new Promise((resolve, reject) => {
    const contract = new web3.eth.Contract(erc20ABI, tokenAddress);
    contract.methods
      .approve(contractAddress, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
      .send({ from: address })
      .on('transactionHash', function (hash) {
        DisplayNotification({key:toastId,message:hash,status:'success',duration:10000});
      })
      .on('receipt', function (receipt) {
        resolve(new BigNumber('Infinity').toNumber());
      })
      .on('error', function (error) {
        reject(error);
      })
      .catch(error => {
        reject(error);
      });
  });
};
