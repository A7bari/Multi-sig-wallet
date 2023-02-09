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

function ApproveTxDialog({open, handleClose, txIndex, transaction}:Props) {
   const {contract} = useMultisigContract()
   const [isOwner , setIsOwner] = useState(false);
   const [isApproved , setIsApproved] = useState(false);
   const [approved , setApproved] = useState(false);
   const [errMsg , setErrMsg] = useState<string|undefined>(undefined);
   const [warningMsg , setWarning] = useState<string|undefined>(undefined);
   const {account} = useWeb3React();

   const getdata = async () => {
      try {
         const res = await contract?.methods.isOwner(account).call() as boolean;
         const isApproved = await contract?.methods.isApproved(txIndex, account).call({from: account}) as boolean;
         setIsOwner(res);
         setIsApproved(isApproved)
         !res && setErrMsg("you are not one of the owners! You can't approve on this transaction.")
         isApproved && setWarning("you already approved on this transaction!")
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

   const handleApprove = async() => {
      try{
         await contract?.methods.approve(txIndex).send({from: account}) ;
         setApproved(true)
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
         aria-labelledby="approve-transaction"
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
               isApproved && (<MuiAlert elevation={6} severity={'warning'} variant='outlined' sx={{mb: 2}}>
                  {warningMsg}
               </MuiAlert>)
            }
            <Typography variant='h6' color='primary.main'> Approving on transaction :</Typography>
            <Grid container spacing={1} sx={{mt: 2}}> 
               <Grid item  sm={3}>address to :</Grid>
               <Grid item  sm={9}>
                  <Typography variant='subtitle1' sx={{ml:3, fontWeight: 700}} color='secondary.main'>  {transaction?.to}</Typography>
               </Grid>
               <Grid item  sm={3}>value:</Grid>
               <Grid item sm={9}>
                  <Typography variant='subtitle1' sx={{ml:3, fontWeight: 700}} color='secondary.main'>  {transaction?.value}</Typography>
               </Grid>
            </Grid>
           <DialogContentText >
           </DialogContentText>
         </DialogContent>
         <DialogActions>
           <Button onClick={handleClose} variant='outlined' size='small' >Cancel</Button>
           <Button onClick={handleApprove} autoFocus disabled={!isOwner || isApproved} size='small' variant='contained'>
             Approve
           </Button>
         </DialogActions>
       </Dialog>
       <SuccessSnackbar
         open={approved}
         autoHideDuration={6000}
         msg={'approves seccessfuly!'}
         setOpen={setApproved}
      />
     </div>
   );
}

export default ApproveTxDialog