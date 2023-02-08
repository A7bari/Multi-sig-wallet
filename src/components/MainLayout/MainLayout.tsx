import React from 'react'
import { Box, Toolbar, useMediaQuery, Theme } from '@mui/material';
import Header from '../Header';
import { Stack } from '@mui/material';
import NavMenu from './../Navigation/NavMenu';
import { Container } from '@mui/system';

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

            </Stack>
         </Container>
      </Box>
   </>
  )
}

export default MainLayout