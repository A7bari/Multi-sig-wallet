import { AppBar, Box,  Container,  Icon, IconButton,Link,Stack,Theme,Toolbar, useMediaQuery, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import Profile from './Profile';
import NavDrawer from '../Navigation/NavDrawer';


const HeaderContent = () => (
    <Typography variant={'h4'}>Multi-sig wallet</Typography>
);

export default function Header() {
  const matchesXs = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" >
        <Toolbar>
          <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            
            { !matchesXs ? ( 
                <>
                  <Icon component={HeaderContent} />
                  <Stack direction="row" spacing={2.5} alignItems="center">
                    {/* {navItems.map((item, i) => (
                      <Link  key={i} href={item.url} variant='button' color={'inherit'} underline='hover'>
                          {t(item.label)}
                      </Link>
                    ))} */}
                  </Stack>
                </>
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
              <Profile />
            </Stack>
            
          </Container>
        </Toolbar>
      </AppBar>

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
