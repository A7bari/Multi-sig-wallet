import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar, {SnackbarProps} from '@mui/material/Snackbar';
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert';

interface Props extends SnackbarProps{
   msg: string,
   SnackbarType?: AlertColor,
   setOpen: (open: boolean) => void,
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
   props,
   ref,
 ) {
   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
 });

function SuccessSnackbar({msg, setOpen, SnackbarType,  ...props}: Props) {

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
   <Snackbar autoHideDuration={6000} onClose={handleClose} {...props}>
      <Alert onClose={handleClose} severity={SnackbarType? SnackbarType : 'success'} sx={{ width: '100%' }}>
         {msg}
      </Alert>
   </Snackbar>
  )
}

export default SuccessSnackbar