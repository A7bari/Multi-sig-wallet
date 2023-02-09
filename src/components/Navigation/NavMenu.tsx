import React from 'react'
import { List, Paper, ListItem, ListItemButton, ListItemIcon, ListItemText, SvgIcon, Typography } from '@mui/material';
import { navItems } from '../../helpers/const';
import { Divider } from '@mui/material';
import { useTheme } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

function NavMenu() {
   const location = useLocation();
   const theme = useTheme();
   const navigate = useNavigate();
  
  return (
   <Paper sx={{p:2, mt: 3, backgroundImage: 'none',minWidth: 290}}> 
      <List>
         {navItems.map((item, i) => {
            const isSelected = item.url === location.pathname;

            return <ListItem key={i} >
                  <ListItemButton 
                     onClick={() => navigate(item.url)}
                     selected={isSelected}
                     sx={{
                        px:2, 
                        borderRadius: 1, 
                        '&.Mui-selected': { borderRight: `2px solid ${theme.palette.primary.main}` }
                     }}
                  >
                     {item?.icon && (
                        <ListItemIcon
                           sx={{
                                 minWidth: 28,
                                 mr: .5,
                                 color: 'secondary.main',
                           }}
                        >
                           <SvgIcon component={item.icon} inheritViewBox />
                        </ListItemIcon>
                     )}
                     <ListItemText 
                        primary={item.label} 
                        primaryTypographyProps={{fontWeight: isSelected? 600: 500, color: isSelected ? 'primary.main': ''}}
                     />
                  </ListItemButton>
            </ListItem>
         })} 
      </List>
   </Paper>
  )
}

export default NavMenu