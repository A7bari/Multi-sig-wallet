import React from 'react'
import { List, Paper, ListItem, ListItemButton, ListItemIcon, ListItemText, SvgIcon, Typography } from '@mui/material';
import { navItems } from '../../helpers/const';
import { Divider } from '@mui/material';
import { useTheme } from '@mui/material';

function NavMenu() {
   const selected = 1;
   const theme = useTheme();
  return (
   <Paper sx={{p:2, mt: 3, backgroundImage: 'none',}}> 
      <List>
         {navItems.map((item, i) => (
            <ListItem key={i} >
                  <ListItemButton 
                     onClick={() => {}}
                     selected={selected === i}
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
                        primaryTypographyProps={{fontWeight: (selected === i)? 600: 500, color: (selected === i) ? 'primary.main': ''}}
                     />
                  </ListItemButton>
            </ListItem>
         ))} 
      </List>
   </Paper>
  )
}

export default NavMenu