import React, {useState, useEffect} from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMultisigContract from 'hooks/useMultisigContract';
import { useWeb3React } from '@web3-react/core';
import { Transaction } from 'pages/Transactions/Transactions';
import Typography from '@mui/material/Typography/Typography';
import Grid from '@mui/material/Grid/Grid';
import SuccessSnackbar from 'components/Snackbars/SuccessSnackbar';
import MuiAlert from '@mui/material/Alert'

interface Props {
   open: boolean,
   txIndex: number | undefined,
   handleClose: ()=>void ,
   transaction?: Transaction
}

function ExecuteTxDialog({open, handleClose, txIndex, transaction}:Props) {
   const {contract} = useMultisigContract()
   const [isOwner , setIsOwner] = useState(false);
   const [isApproved , setIsApproved] = useState(false);
   const [execute , setExecute] = useState(false);
   const [errMsg , setErrMsg] = useState<string|undefined>(undefined);
   const [warningMsg , setWarning] = useState<string|undefined>(undefined);
   const {account} = useWeb3React();

   const getdata = async () => {
      try {
         const res = await contract?.methods.isOwner(account).call() as boolean;
         const isApproved = await contract?.methods.isApproved(txIndex, account).call({from: account}) as boolean;
         setIsOwner(res);
         setIsApproved(isApproved)
         !res && setErrMsg("you are not one of the owners! You can't execute this transaction.")
         !isApproved && setWarning("wait to approve the transaction !")
      } catch (error) {
         setErrMsg('something went wrong!')
      } 
   }

   useEffect( () => {
      if(open){
         getdata()
      }

      return () => {
         setIsOwner(false)
         setErrMsg(undefined)
         setWarning(undefined)
      }
   }, [contract, open])

   const handleExecute = async() => {
      try{
         await contract?.methods.execute(txIndex).send({from: account}) ;
         setExecute(true)
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
            { !isOwner && <MuiAlert elevation={6} severity={'error'} variant='outlined' sx={{mb: 2}}>
                  {errMsg}
               </MuiAlert>
            }
            {
               !isApproved && (<MuiAlert elevation={6} severity={'warning'} variant='outlined' sx={{mb: 2}}>
                  {warningMsg}
               </MuiAlert>)
            }
            <Typography variant='h6' color='warning.main'> Revoking transaction :</Typography>
            <Grid container spacing={1} sx={{mt: 2}}> 
               <Grid item  sm={3}>address to :</Grid>
               <Grid item  sm={9}>
                  <Typography variant='subtitle1' sx={{ml:{xs:0, sm: 3}, fontWeight: 700}} color='secondary.main'>  {transaction?.to}</Typography>
               </Grid>
               <Grid item  sm={3}>value:</Grid>
               <Grid item sm={9}>
                  <Typography variant='subtitle1' sx={{ml:{xs:0, sm: 3}, fontWeight: 700}} color='secondary.main'>  {transaction?.value}</Typography>
               </Grid>
            </Grid>
           <DialogContentText >
           </DialogContentText>
         </DialogContent>
         <DialogActions>
           <Button onClick={handleClose} variant='outlined' size='small' >Cancel</Button>
           <Button onClick={handleExecute} autoFocus disabled={!isOwner || !isApproved} size='small' variant='contained'>
             Execute
           </Button>
         </DialogActions>
       </Dialog>
       <SuccessSnackbar
         open={execute}
         autoHideDuration={6000}
         msg={'Executed seccessfuly!'}
         setOpen={setExecute}
         />
     </div>
   );
}

export default ExecuteTxDialog