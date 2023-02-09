import { Button, Card, Chip, Container, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import useMultisigContract from 'hooks/useMultisigContract';
import  {useState, useEffect} from 'react'
import AddTaskIcon from '@mui/icons-material/AddTask';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import { useWeb3React } from '@web3-react/core';
import ApproveTxDialog from 'components/ApproveTxDialog';

export interface Transaction{
   to : string,
   value: number,
   data: string,
   executed: boolean,
   nbrApprovals:number
}

const headLabel = [
   'number', 'to address', 'value', 'data', 'excuted', 'confirmations' , ''
]

function Transactions() {
   const {contract} = useMultisigContract()
   const [transactions , setTransactions ] = useState<Transaction[]>([])
   const [nbrApprovalsRequired, setNbrApprovalsRequired] = useState(0);
   const [performing , setPerforming] = useState(true);
   const [errMsg , setErrMsg] = useState<string|null>(null);
   const {account} = useWeb3React();
   const [dialogOpen, setDialogOpen] = useState(false);
   const [txIndex, setTxIndex] = useState<number|undefined>(undefined);
   const [currentTx, setCurrentTx] = useState<Transaction|undefined>(undefined);

   const getData = async () => {
      try {
         const res = await contract?.methods.getTransactions().call({from: account}) as Transaction[];
         const nbr = await contract?.methods.NbrApprovalRequired().call({from: account})
         setTransactions(res);
         setNbrApprovalsRequired(nbr);
      } catch (error) {
         setErrMsg('something went wrong');
      } finally {
         setPerforming(false);
      }
   }

   useEffect( () => {
      getData();
      return () => {
         setTransactions([]);
         setPerforming(true);
      }
   }, [contract])

   function handleApprove(txIndex: number, tx: Transaction) {
      setTxIndex(txIndex);
      setDialogOpen(true);
      setCurrentTx(tx);
   } 
   function handleDialogClose() {
      setTxIndex(undefined);
      setDialogOpen(false);
      setCurrentTx(undefined);
      getData();
   } 

  return (
   <Container sx={{mt: 6}}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h5" gutterBottom>
            All transactions
          </Typography>
          <Button variant="contained" size='small'>
            New transaction
          </Button>
        </Stack>

        <Card>
        {(performing)
         &&  (
               <Paper
                  sx={{
                     textAlign: 'center',
                  }}
               >
                  <CircularProgress />
               </Paper>

         )}
         { !!transactions 
            && (
            <TableContainer sx={{ minWidth: 800 }}>
               <Table sx={{ border: '1px solid',
                     borderColor: 'secondary.main'}}>
               <TableHead 
                  sx={{
                     backgroundColor: 'background.default',
                  }}
               >
                  <TableRow>
                     {headLabel.map((headCell,i) => (
                        <TableCell
                           key={i}
                           align={'center'}
                        >
                           {headCell}
                        </TableCell>
                     ))}
                  </TableRow>
               </TableHead>
               <TableBody>
                  {transactions.map((tx, index) => {
                     const { to, value, data, executed, nbrApprovals} = tx;
                     const canBeApproved = nbrApprovalsRequired <= nbrApprovals ;

                     return (
                     <TableRow hover key={index} tabIndex={-1}  selected={false}>

                        <TableCell component="th" scope="row" padding="none" align='center'>
                           <Typography variant="subtitle2" noWrap color={'primary.main'} sx={{fontWeight: 700}}>
                              {index}
                           </Typography>
                        </TableCell>

                        <TableCell align="left">{to}</TableCell>

                        <TableCell align="center">{value}</TableCell>

                        <TableCell align="center">{data}</TableCell>

                        <TableCell align="center">{executed ? 'Yes' : 'No'}</TableCell>

                        <TableCell align="center">
                           <Chip  variant="outlined" label={nbrApprovals} color={(!canBeApproved && 'warning') || 'success'} />
                        </TableCell>

                        <TableCell align="right">
                           <Button 
                              size="small" 
                              onClick={() => handleApprove(index, tx)} 
                              variant='outlined' 
                              startIcon={<AddTaskIcon />}
                           >
                              Approve
                           </Button>
                        </TableCell>
                     </TableRow>
                     );
                  })}
               </TableBody>
               </Table>
            </TableContainer>
         )}

        </Card>
        <ApproveTxDialog
            open={dialogOpen && txIndex !== undefined}
            handleClose={handleDialogClose}
            txIndex={txIndex}
            transaction={currentTx}
        />
      </Container>
  )
}

export default Transactions