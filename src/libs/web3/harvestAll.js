import { harvestAllABI } from 'libs/config';

export const harvestAll = async ({address,web3, vaults}) => {
  const harvestAllAddress = '0x838A7Da98eC630Cd9281C824BC85287D261135D8';
  const harvestAllContract = new web3.eth.Contract(harvestAllABI, harvestAllAddress);
  const data = await _harvestAll({ address,contract: harvestAllContract, vaults});
  return data;
};

const _harvestAll = ({address,contract,vaults}) => {
    console.log('vaults',vaults);
    let _addresses = vaults.map(x => x.vaultContractAddress);
    console.log('_addresses',_addresses);

  return new Promise((resolve, reject) => {
    contract.methods
      .harvestAll(_addresses)
      .send({ from: address })
      .on('transactionHash', function (hash) {
        console.log(hash);
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
