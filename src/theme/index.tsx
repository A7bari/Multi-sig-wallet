
import {PropsWithChildren, useMemo } from 'react';

// material-ui
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const Palette = () => {


   return createTheme({
       palette: {
           mode : 'dark',
           common: {
             black: '#090B1C',
             white: '#F6F6F6',
           },
           primary: {
             light: '#dbfba8',
             main: '#C7FF6C',
           },
           secondary: {
             main: '#ffdd6c',
           },
           text: {
             primary: '#C7FF6C',
             secondary: '#aeaeae',
           },
           action: {
             disabled: grey[300]
           },
           divider: '#141B43',
           background: {
             default: '#0E0F10',
             paper: '#030305', 
           }
       }
   });
};

// ==============================|| DEFAULT THEME - MAIN  ||============================== //

export default function ThemeCustomization({ children }: PropsWithChildren) {
    const theme = Palette();

    const themeOptions = useMemo(   
        () => ({
            palette: theme.palette,
        }),
        [theme]
    );

    const themes = createTheme(themeOptions);
    return (
       <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    )
}

