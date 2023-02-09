import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useWeb3React } from '@web3-react/core';
import useMultisigContract from 'hooks/useMultisigContract';
import { useEffect, useState } from 'react'
import { formatEther } from '@ethersproject/units';


function Wallet() {
   const { address} = useMultisigContract();
   const {library} = useWeb3React();
   const [performing , setPerforming] = useState(true);
   const [balance , setBalance] = useState('0');

   useEffect( () => {
      const getowners = async () => {
         try {
            const balance = await library?.eth.getBalance(address);
            setBalance(formatEther(balance))
         } catch (error) {
            
         } finally {
            setPerforming(false);
         }
      }
      getowners()

      return () => setBalance('0')
   }, [address])

  return (
      <Stack height={'100%'} width={'100%'} alignItems='center' sx={{mt: 6}}>
         <Paper sx={{px:6, py: 8, borderRadius: 2, }}>
            <Stack spacing={3}>
               <Stack spacing={1}>
                  <Typography variant={'subtitle2'} >wallet address</Typography>
                  <Button 
                     sx={{border: '1px solid', borderColor: 'primary.main',p:2, borderRadius: 2, fontWeight: 600, color:'text.disabled'}}
                     size='small'
                    
                  >
                     {address}
                  </Button>
               </Stack>
               <Stack spacing={1}>
                  <Typography variant={'subtitle2'} >balance :</Typography>
                  <Typography 
                     sx={{backgroundColor: 'primary.main',p:2, borderRadius: 2, fontWeight: 800, color:'background.default', textAlign: 'center'}}
                     variant='h3'
                  >
                     {balance} eth
                  </Typography>
               </Stack>
            </Stack>
         </Paper>
      </Stack>
  )
}

export default Wallet