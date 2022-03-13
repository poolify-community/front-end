import { bnbVaultABI } from '../config';
//import { enqueueSnackbar } from '../common/redux/actions';

export const depositBnb = async ({ web3, address, amount, contractAddress, DisplayNotification }) => {
  const contract = new web3.eth.Contract(bnbVaultABI, contractAddress);
  const data = await _deposit({ web3, contract, amount, address, DisplayNotification });
  return data;
};

const _deposit = ({ web3, contract, amount, address, DisplayNotification }) => {
  return new Promise((resolve, reject) => {
    contract.methods
      .depositBNB()
      .send({ from: address, value: amount })
      .on('transactionHash', function (hash) {
        console.log(hash);
        DisplayNotification({message:hash,status:'success'});
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
