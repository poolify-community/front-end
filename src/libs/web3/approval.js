import { erc20ABI } from '../config';
import BigNumber from 'bignumber.js';
import { customHashAlert } from 'libs/helpers/notifier';

export const approval = ({ web3, address, tokenAddress, contractAddress,DisplayNotification,toastId}) => {

  return new Promise(async (resolve, reject) => {
    let networkId = await web3.eth.net.getId();
    const contract = new web3.eth.Contract(erc20ABI, tokenAddress);
    contract.methods
      .approve(contractAddress, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
      .send({ from: address })
      .on('transactionHash', function (hash) {
        DisplayNotification({
          key:toastId,
          message:customHashAlert(networkId,hash),
          status:'success',
          duration:null
        });
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
