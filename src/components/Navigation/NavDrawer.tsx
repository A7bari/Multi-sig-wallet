import { Drawer, Stack } from "@mui/material";
import React, { ReactElement } from "react";
import NavMenu from "./NavMenu";

interface Props {
  handleDrawerToggle (event: React.MouseEvent<HTMLDivElement, MouseEvent>) : void,
  open: boolean,
  HeaderContent? : JSX.Element | ReactElement
}

export default function NavDrawer({handleDrawerToggle, open, HeaderContent}: Props) {

  return (
    <Drawer
      variant="temporary"
      anchor='right'
      open={open}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        '& .MuiDrawer-paper': { 
          boxSizing: 'border-box',
          width: 300,
          backgroundImage: 'none',
          boxShadow: 'inherit'
        },
      }}
    >
          <Stack direction="row" spacing={1} alignItems="start" sx={{p: 2 }}>
            {HeaderContent}
          </Stack>
          <NavMenu />
    </Drawer>
  )
}
