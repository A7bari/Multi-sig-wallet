import React from 'react'
import { Box, Toolbar, useMediaQuery, Theme } from '@mui/material';
import Header from '../Header';
import { Stack } from '@mui/material';
import NavMenu from './../Navigation/NavMenu';
import { Container } from '@mui/system';
import {Routes, Route } from 'react-router-dom';
import Owners from 'pages/Owners';
import Wallet from 'pages/Wallet';
import SubmitTransaction from 'pages/SubmitTransaction';
import Transactions from 'pages/Transactions';

function MainLayout() {
   const matchesXs = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  return (
   <>
      <Header />
      <Box component="main" sx={{ width: '100%' }}>
         <Toolbar />
         <Container>
            <Stack  direction={'row'}>
               {!matchesXs && <Box sx={{maxWidth: 300}}>
                              <NavMenu />
                           </Box>}
               <Routes>
                  <Route path={'/owners'} element={<Owners />} />
                  <Route path={'/transactions'} element={<Transactions />} />
                  <Route path={'/wallet'} element={<Wallet />} />
                  <Route path={'/submitTansaction'} element={<SubmitTransaction />} />
               </Routes>

            </Stack>
         </Container>
      </Box>
   </>
  )
}

export default MainLayout