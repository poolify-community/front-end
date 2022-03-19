import { bnbVaultABI } from '../config';
//import { enqueueSnackbar } from '../common/redux/actions';

export const depositBnb = async ({ web3, address, amount, contractAddress, DisplayNotification,toastId }) => {
  const contract = new web3.eth.Contract(bnbVaultABI, contractAddress);
  const data = await _deposit({ web3, contract, amount, address, DisplayNotification,toastId });
  return data;
};

const _deposit = ({ web3, contract, amount, address, DisplayNotification,toastId }) => {
  return new Promise((resolve, reject) => {
    contract.methods
      .depositBNB()
      .send({ from: address, value: amount })
      .on('transactionHash', function (hash) {
        console.log(hash);
        DisplayNotification({key:toastId,message:hash,status:'success',duration:10000});
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
  });
};
