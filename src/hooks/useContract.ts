import {useEffect, useMemo, useState} from 'react';
import { AddressZero } from '@ethersproject/constants';
import { useWeb3React } from '@web3-react/core';
import { Contract as web3EthContract } from 'web3-eth-contract';
import Web3 from 'web3';

// Taken from https://github.com/adilmezghouti/blockchain-developer-bootcamp-final-project 
// with some small changes

export function useContract(contractJson: Record<string, any> ) {
  const [address, setAddress] = useState(AddressZero);
  const [instance, setInstance] = useState<web3EthContract>();
  const [error, setError] = useState('');
  const { library, account, chainId } = useWeb3React();

  useEffect(() => {
   //@ts-ignore
    const {ethereum} = window
    const web3 = new Web3(ethereum);

    web3.eth.net.getId().then((networkId : number|string) => {
      const _address = contractJson?.networks[networkId]?.address;
      if (_address) {
        setAddress(_address);
        setInstance(new web3.eth.Contract(contractJson.abi, _address));
      } else {
        setError('No Trust Fund account found.')
        setAddress('');
        setInstance(undefined);
      }
    })

  }, [JSON.stringify(contractJson), chainId])


  return useMemo(() => {
    return {
      contract: instance,
      address,
      error
    };
  }, [address, JSON.stringify(contractJson), instance]);
}