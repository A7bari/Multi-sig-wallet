import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

export interface navItemType {
   label : string,
   url: string ,
   icon? :  OverridableComponent<SvgIconTypeMap<{}, "svg">>
 }
 
 export const navItems : navItemType[] = [
   { label: 'owners', url: '/home',   }, 
   { label: 'wallet', url: '/wallet' }, 
   { label: 'transactions' , url: '/tramsactions' },
   { label: 'submit transactions' , url: '/submitTamsactions' }
 ];