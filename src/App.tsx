import { useEffect} from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected } from './connector/connector';
import { Stack } from '@mui/system';
import { LinearProgress, Typography } from '@mui/material';
import MainLayout from './components/MainLayout/MainLayout';

function App() {

  const { activate, active } = useWeb3React();

  const connect = async() => {
    try {
      await activate(injected) ;
    } catch (error) {
      console.log({error})
    }
  }

  useEffect(() => {
    !active && connect();
  }, [active])
  

  return (
    !active 
      ? <Stack height={'100vh'} justifyContent={'center'} alignItems={'center'} spacing={2}>
          <Typography variant='h2'>Connecting Your Wallet</Typography>
          <Typography variant='body1' color={'primary.light'}>Please wait while we securely connect to your wallet.</Typography>
          <Stack width={'100%'}><LinearProgress /></Stack>
          <Typography variant='body2'>Make sure you are using Metamask: The wallet you are connecting must be Unlocked</Typography>
        </Stack>
      : <MainLayout/>
    
  );
}

export default App;