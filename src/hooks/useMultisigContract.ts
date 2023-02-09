import MultisigWallet  from 'contract/MultisigWallet.json';
import { useContract } from './useContract';

const useMultisigContract = () => useContract(MultisigWallet);

export default useMultisigContract;