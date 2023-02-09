import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import {useState} from 'react'
import Button  from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import useMultisigContract from 'hooks/useMultisigContract';
import { useWeb3React } from '@web3-react/core';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import SuccessSnackbar from 'components/Snackbars/SuccessSnackbar';
import Web3 from 'web3';

const initialState = {
   address_to : "",
   value: ''
}

function SubmitTransaction() {
   const [values, setValues] = useState(initialState);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [open, setOpen] = useState(false);
   const [err, setErr] = useState(false);
   const [msg, setMsg] = useState('');
   const {contract} = useMultisigContract();
   const {account } = useWeb3React();

   const handleSubmit = async() =>{

      setIsSubmitting(true);
      try{
         if( !contract ) throw new Error();
         const value = Web3.utils.toWei(values.value , 'ether');
         await contract.methods.submit(values.address_to, value , "0x00").send({from: account});
         setMsg('sabmitted successfuly!');
         setOpen(true);
      } catch(e) {
         setMsg('sabmiting failed !');
         setErr(true);
         setOpen(true);
      }finally{
         setIsSubmitting(false);
         !err && setValues(initialState);
      }
   }

  return (
   <Container maxWidth='sm' >
   <Box component={Paper} sx={{ mt: 6, p:6 }}>
      <Grid container spacing={3}>
         <Grid item xs={12}>
               <Divider  >
                  <Typography variant='subtitle1' color='secondary.light' sx={{mb:2}}>submit new transaction: </Typography>
               </Divider>
         </Grid>
         <Grid item xs={12}>
            <InputLabel htmlFor="address_to">address to</InputLabel>
            <OutlinedInput 
               name='address_to'
               value={values.address_to}
               required
               fullWidth
               placeholder="0x00"
               onChange={(e) => setValues(prev => ({...prev, address_to: e.target.value})) }
               autoFocus
               error={err}
            />
         </Grid>
         <Grid item xs={12}>
            <InputLabel htmlFor="value">value to submit</InputLabel>
            <OutlinedInput 
               name='value'
               value={values.value}
               required
               fullWidth
               placeholder="0"
               onChange={(value) => setValues(prev => ({...prev, value: value.target.value})) }
               autoFocus
               error={err}
            />
         </Grid>
         <Grid item xs={12}>
            <Button
               onClick={handleSubmit}
               fullWidth
               variant="contained"
               disabled={isSubmitting}
               sx={{ mt: 3, mb: 2 }}
               >
               { isSubmitting ? <CircularProgress size={25} /> : 'submit'}
            </Button>
         </Grid>
      </Grid>
   </Box>
   <SuccessSnackbar
        open={open}
        autoHideDuration={6000}
        msg={msg}
        setOpen={setOpen}
        SnackbarType={err? 'error': 'success'}
   />
   </Container>
  )
}

export default SubmitTransaction