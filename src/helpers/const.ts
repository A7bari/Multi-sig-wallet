import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

export interface navItemType {
   label : string,
   url: string ,
   icon? :  OverridableComponent<SvgIconTypeMap<{}, "svg">>
 }
 
 export const navItems : navItemType[] = [
   { label: 'owners', url: '/owners',   }, 
   { label: 'wallet', url: '/wallet' }, 
   { label: 'transactions' , url: '/transactions' },
   { label: 'submit transactions' , url: '/submitTansaction' }
 ];