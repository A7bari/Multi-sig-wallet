import { Button, Card, Chip, Container, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import useMultisigContract from 'hooks/useMultisigContract';
import  {useState, useEffect} from 'react'
import AddTaskIcon from '@mui/icons-material/AddTask';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import { useWeb3React } from '@web3-react/core';
import ApproveTxDialog from 'components/ApproveTxDialog';
import Web3 from 'web3';
import RevokeTxDialog from 'components/RevokeTxDialog';
import CheckIcon from '@mui/icons-material/Check';
import ExecuteTxDialog from 'components/ExecuteTxDialog';
import { useNavigate } from 'react-router-dom';

export interface Transaction{
   to : string,
   value: number,
   data: string,
   executed: boolean,
   nbrApprovals:number
}

const headLabel = [
   'number', 'to address', 'value', 'excuted', 'confirmations' , ''
]

function Transactions() {
   const {contract} = useMultisigContract()
   const {account} = useWeb3React();
   const navigate = useNavigate();
   const [transactions , setTransactions ] = useState<Transaction[]>([])
   const [nbrApprovalsRequired, setNbrApprovalsRequired] = useState(0);
   const [performing , setPerforming] = useState(true);
   const [errMsg , setErrMsg] = useState<string|null>(null);
   const [approveDialogOpen, setApproveDialogOpen] = useState(false);
   const [revokeDialogOpen, setRevokeDialogOpen] = useState(false);
   const [executeDialogOpen, setExecuteDialogOpen] = useState(false);
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

   function handleAction(txIndex: number, tx: Transaction) {
      setTxIndex(txIndex);
      setCurrentTx(tx);
   } 

   function handleDialogClose() {
      setTxIndex(undefined);
      setCurrentTx(undefined);
      getData();
   } 

  return (
   <Container sx={{mt: 6}}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h5" gutterBottom>
            All transactions
          </Typography>
          <Button variant="contained" size='small' onClick={() => navigate('/submitTansaction')}>
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
                     const { to, value, executed, nbrApprovals} = tx;
                     const canBeApproved = nbrApprovalsRequired <= nbrApprovals ;
                     const convertedValue =  Web3.utils.fromWei(value + '', 'ether');

                     return (
                     <TableRow hover key={index} tabIndex={-1}  selected={false}>

                        <TableCell component="th" scope="row" padding="none" align='center'>
                           <Typography variant="subtitle2" noWrap color={'primary.main'} sx={{fontWeight: 700}}>
                              {index}
                           </Typography>
                        </TableCell>

                        <TableCell align="left">{to}</TableCell>

                        <TableCell align="center">{convertedValue} eth</TableCell>

                        <TableCell align="center">{executed ? 'Yes' : 'No'}</TableCell>

                        <TableCell align="center">
                           <Chip  variant="outlined" label={nbrApprovals} color={(!canBeApproved && 'warning') || 'success'} />
                        </TableCell>

                        <TableCell align="right">
                           <Button 
                              size="small" 
                              onClick={() => {
                                 handleAction(index, tx)
                                 setApproveDialogOpen(true);
                              }} 
                              variant='outlined' 
                              startIcon={<AddTaskIcon />}
                              sx={{color: 'text.disabled'}}
                           >
                              Approve
                           </Button>
                           <Button 
                              size="small" 
                              onClick={() => {
                                 handleAction(index, tx)
                                 setRevokeDialogOpen(true);
                              }}
                              variant='outlined' 
                              startIcon={<HighlightOffIcon />}
                              sx={{color: 'warning.main'}}
                           >
                              Revoke
                           </Button>
                           <Button 
                              size="small" 
                              onClick={() => {
                                 handleAction(index, tx)
                                 setExecuteDialogOpen(true);
                              }}
                              variant='outlined' 
                              startIcon={<CheckIcon />}
                              sx={{color: 'success.main'}}
                           >
                              execute
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
            open={approveDialogOpen && txIndex !== undefined}
            handleClose={()=> {
               handleDialogClose();
               setApproveDialogOpen(false);
            }}
            txIndex={txIndex}
            transaction={currentTx}
        />
        <RevokeTxDialog
            open={revokeDialogOpen && txIndex !== undefined}
            handleClose={ ()=> {
               handleDialogClose();
               setRevokeDialogOpen(false);
            }}
            txIndex={txIndex}
            transaction={currentTx}
        />
        <ExecuteTxDialog
            open={executeDialogOpen && txIndex !== undefined}
            handleClose={ ()=> {
               handleDialogClose();
               setExecuteDialogOpen(false);
            }}
            txIndex={txIndex}
            transaction={currentTx}
        />
      </Container>
  )
}

export default Transactions