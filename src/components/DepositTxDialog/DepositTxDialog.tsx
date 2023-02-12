import React, {useState, useEffect} from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMultisigContract from 'hooks/useMultisigContract';
import { useWeb3React } from '@web3-react/core';
import Typography from '@mui/material/Typography/Typography';
import Grid from '@mui/material/Grid/Grid';
import SuccessSnackbar from 'components/Snackbars/SuccessSnackbar';
import OutlinedInput from '@mui/material/OutlinedInput';
import Web3 from 'web3';

interface Props {
   open: boolean,
   handleClose: ()=>void ,
}

function DepositTxDialog({open, handleClose}:Props) {
   const {contract, address} = useMultisigContract()
   const [deposit , setDeposit] = useState(false);
   const [value , setValue] = useState('');
   const [errMsg , setErrMsg] = useState<string|undefined>(undefined);
   const {account, library} = useWeb3React();
 
   const handleDeposit = async() => {
      try{
         const convertedValue = Web3.utils.toWei(value, 'ether')
         const res = await library.eth.sendTransaction({from: account, to: address, value: convertedValue}) ;
         console.log(res)
         setDeposit(true)
         handleClose();
      } catch (e){
         setErrMsg('something went wrong!, try again.')
      }
   }

   return (
     <div>
       <Dialog
         open={open}
         onClose={handleClose}
       >
         <DialogTitle>
           {""}
         </DialogTitle>
         <DialogContent>
            <Typography variant='h6' color='warning.main'> Deposit to wallet :</Typography>
            <Grid container spacing={1} sx={{mt: 2}}> 
               <Grid item  sm={12}>address to :</Grid>
               <Grid item  sm={12}>
                  <OutlinedInput 
                     name='value'
                     required
                     fullWidth
                     placeholder="0"
                     onChange={(e) => setValue(e.currentTarget.value)}
                     autoFocus
                     error={parseInt(value) < 0}
                  />
               </Grid>
               
            </Grid>
           <DialogContentText >
           </DialogContentText>
         </DialogContent>
         <DialogActions>
           <Button onClick={handleClose} variant='outlined' size='small' >Cancel</Button>
           <Button onClick={handleDeposit} autoFocus size='small' variant='contained'>
             Deposit
           </Button>
         </DialogActions>
       </Dialog>
       <SuccessSnackbar
         open={deposit}
         autoHideDuration={6000}
         msg={'Executed seccessfuly!'}
         setOpen={setDeposit}
         />
     </div>
   );
}

export default DepositTxDialog;