import React from 'react'
import { Box, Toolbar } from '@mui/material';
import Header from '../Header';

function MainLayout() {
  return (
   <>
      <Header />
      <Box component="main" sx={{ width: '100%' }}>
         <Toolbar />
      </Box>
   </>
  )
}

export default MainLayout