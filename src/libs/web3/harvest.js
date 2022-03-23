import { strategyABI } from 'libs/config';
import { fetchStrategy } from 'libs/web3';

export const harvest = async ({ web3, address, vaultContractAddress, DisplayNotification,toastId }) => {
  const strategyContractAddress = await fetchStrategy({
    web3,
    contractAddress: vaultContractAddress,
  });
  const strategyContract = new web3.eth.Contract(strategyABI, strategyContractAddress);
  const data = await _harvest({ contract: strategyContract, address, DisplayNotification,toastId });
  return data;
};

const _harvest = ({ contract, address, DisplayNotification,toastId }) => {
  return new Promise((resolve, reject) => {
    contract.methods
      .harvest()
      .send({ from: address })
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
