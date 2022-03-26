import { vaultABI } from '../config';
//import { enqueueSnackbar } from '../common/redux/actions';
import { customHashAlert } from 'libs/helpers/notifier';

export const deposit = async ({ web3, address, isAll, amount, contractAddress, DisplayNotification,toastId }) => {
  const contract = new web3.eth.Contract(vaultABI, contractAddress);
  const data = await _deposit({ web3, contract, isAll, amount, address, DisplayNotification,toastId });
  return data;
};



const _deposit = ({ web3, contract, amount, isAll, address, DisplayNotification,toastId }) => {
  return new Promise(async (resolve, reject) => {
    let networkId = await web3.eth.net.getId();
    if (isAll) {
      contract.methods
        .depositAll()
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
          resolve();
        })
        .on('error', function (error) {
          reject(error);
        })
        .catch(error => {
          reject(error);
        });
    } else {
      contract.methods
        .deposit(amount)
        .send({ from: address })
        .on('transactionHash', function (hash) {
          console.log(hash);
          DisplayNotification({
            key:toastId,
            message:customHashAlert(networkId,hash),
            status:'success',
            duration:null
          });
        })
        .on('receipt', function (receipt) {
          console.log(receipt);
          resolve();
        })
        .on('error', function (error) {
          console.log(error);
          reject(error);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    }
  });
};
