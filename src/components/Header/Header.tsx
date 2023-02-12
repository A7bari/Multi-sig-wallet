import { AppBar, Box,  Container,  Icon, IconButton,Link,Stack,Theme,Toolbar, useMediaQuery, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import Profile from './Profile';
import NavDrawer from '../Navigation/NavDrawer';
import Button from '@mui/material/Button';
import DepositTxDialog from 'components/DepositTxDialog';


const HeaderContent = () => (
    <Typography variant={'h6'}>Multi-sig wallet</Typography>
);

export default function Header() {
  const matchesXs = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDiposit, setOpenDiposit] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" >
        <Toolbar>
          <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            
            { !matchesXs ? ( 
                  <Icon component={HeaderContent} />
              ) : (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2}}
                >
                  <MenuIcon />
                </IconButton>
            )}
            
            <Stack spacing={1.4} direction='row' alignItems="center">
              <Button variant='contained' onClick={() => setOpenDiposit(true)}>
                Deposit
              </Button>
              <Profile />
            </Stack>
            
          </Container>
        </Toolbar>
      </AppBar>

      <DepositTxDialog
            open={openDiposit}
            handleClose={ ()=> {
               setOpenDiposit(false);
            }}
        />

      { matchesXs && (
          <NavDrawer 
            handleDrawerToggle={handleDrawerToggle} 
            open={mobileOpen}
            HeaderContent={HeaderContent()} 
          />
      )}

    </Box>
  )
}
