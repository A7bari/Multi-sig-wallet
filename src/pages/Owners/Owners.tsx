
import useMultisigContract from 'hooks/useMultisigContract'
import { useState, useEffect } from 'react';
import { Stack, LinearProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';


function Owners() {
   const {contract} = useMultisigContract()
   const [owners , setOwners ] = useState<string[]>([])
   const [performing , setPerforming] = useState(true);

   useEffect( () => {
      const getowners = async () => {
         try {
            const res = await contract?.methods.getOwners().call() as string[];
            setOwners(res);
            console.log(contract)
         } catch (error) {
         } finally {
            setPerforming(false);
         }
      }
      getowners()

      return () => {
         setOwners([])
         setPerforming(true)
      }
   }, [contract])


  return (  
    (!!owners)
      ?   <Stack height={'100%'} width={'100%'} alignItems='center' sx={{mt: 6}}>
            <Paper sx={{px:6, py: 8, borderRadius: 2, }}>
               <Typography variant='subtitle2' color={'secondary.light'}>Owners of this wallet: </Typography>
               <Stack spacing={3} sx={{mt:4}}>
                  {(owners as string[]).map( (owner,i) => (
                     <Stack key={i}>
                        <Typography variant='subtitle2' >owner {i+1}</Typography>
                        <Typography 
                           key={i} 
                           variant='subtitle1' 
                           sx={{
                              p: 2, 
                              my:1,
                              border: '1px solid',
                              borderColor: 'primary.light',
                              borderRadius: 2,
                           }}
                        >
                           {owner}
                        </Typography>
                     </Stack>
                  ))}
               </Stack>
            </Paper>
         </Stack>
      : <LinearProgress />

  )
}

export default Owners