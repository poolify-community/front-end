import { vaultABI } from '../config';
//import { enqueueSnackbar } from '../common/redux/actions';

export const withdraw = async ({ web3, address, isAll, amount, contractAddress, DisplayNotification }) => {
  const contract = new web3.eth.Contract(vaultABI, contractAddress);
  const data = await _withdraw({ web3, contract, isAll, amount, address, DisplayNotification });
  return data;
};

const _withdraw = ({ web3, contract, address, isAll, amount, DisplayNotification }) => {
  return new Promise((resolve, reject) => {
    if (isAll) {
      contract.methods
        .withdrawAll()
        .send({ from: address })
        .on('transactionHash', function (hash) {
          DisplayNotification({message:hash,status:'success'});
        })
        .on('receipt', function (receipt) {
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
    } else {
      contract.methods
        .withdraw(amount)
        .send({ from: address })
        .on('transactionHash', function (hash) {
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
    }
  });
};
