import React from 'react'
import { List, Typography, ListItem, ListItemButton, ListItemIcon, ListItemText, SvgIcon } from '@mui/material';
import { navItems } from '../../helpers/const';

function NavMenu() {
  return (
   <List sx={{my: .5}}>
      {navItems.map((item, i) => (
         <ListItem key={i} >
               <ListItemButton 
                  onClick={() => {}}
                  selected={false}
               >
                  {item.icon && (
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
                     primary={
                        <Typography variant="h6" >
                                 {item.label}
                        </Typography>
                     } 
                  />
               </ListItemButton>
         </ListItem>
      ))} 
   </List>
  )
}

export default NavMenu