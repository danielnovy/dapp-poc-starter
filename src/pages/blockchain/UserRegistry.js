import web3 from './Web3Provider'
import ContractData from '../../../config/auth/UserRegistry.js'
import Promise from 'bluebird'
import roles from '../../../config/auth/roles'

let abi = JSON.parse(ContractData.abi);
let registry = web3.eth.contract(abi).at(ContractData.address);

export const getUserInfo = (address) => {
  return new Promise((resolve, reject) => {
    Promise.promisify(registry.users)(address)
    .then((data) => {
      let name = ''+data[0];
      let roleIndex = web3.toBigNumber(data[1]).toNumber();
      let role = roles[roleIndex].desc; // todo: check boundaries
      let targetPage = roles[roleIndex].page; // todo: check boundaries
      let photoUrl = ''+data[2];
      resolve({name, role, photoUrl, targetPage});
    });
  });
}
