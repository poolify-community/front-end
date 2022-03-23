import { testRequestPLFYABI } from 'libs/config';

export const requestTestPLFY = async ({address,web3}) => {
  const contractAddress = '0x86d3a6051691171865acbf5Ef51cdF2e2E556fD9';
  const contract = new web3.eth.Contract(testRequestPLFYABI, contractAddress);
  const data = await _request({ address,contract});
  return data;
};

export const isRequestAvailable = async({address,web3}) => {
    const contractAddress = '0x86d3a6051691171865acbf5Ef51cdF2e2E556fD9';
    const contract = new web3.eth.Contract(testRequestPLFYABI, contractAddress);

  return await contract.methods.isRequestAvailable().call();
}

const _request = ({address,contract}) => {
  return new Promise((resolve, reject) => {
    contract.methods
      .request()
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
