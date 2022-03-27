import { vaultABI } from '../config';
import React from 'react';
import { customHashAlert } from 'libs/helpers/notifier';

//import { enqueueSnackbar } from '../common/redux/actions';

export const withdraw = async ({ web3, address, isAll, amount, contractAddress, DisplayNotification,toastId}) => {
  const contract = new web3.eth.Contract(vaultABI, contractAddress);
  const data = await _withdraw({ web3, contract, isAll, amount, address, DisplayNotification,toastId});
  return data;
};

const _withdraw = ({ web3, contract, address, isAll, amount, DisplayNotification,toastId}) => {

  return new Promise(async (resolve, reject) => {
    let networkId = await web3.eth.net.getId();
    if (isAll) {
      contract.methods
        .withdrawAll()
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
