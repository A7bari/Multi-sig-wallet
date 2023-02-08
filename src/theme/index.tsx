
import {PropsWithChildren } from 'react';

// material-ui
import { CssBaseline, StyledEngineProvider, Theme } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Paper() {
  return {
      MuiPaper: {
          styleOverrides: {
              root: {
                backgroundImage: 'none'
              }
          }
      }
  };
}


// ==============================|| DEFAULT THEME - MAIN  ||============================== //

export default function ThemeCustomization({ children }: PropsWithChildren) {

    const themes = createTheme({
        palette: {
          mode : 'dark',
          common: {
            black: '#090B1C',
            white: '#F6F6F6',
          },
          background: {
            default: '#121827',
            paper: '#1b2130'
          },
          divider: '#E6E8F0',
          primary: {
            main: '#0db981',
            light: '#18b79e'
          },
          secondary: {
            main: '#fa8c01',
            light: '#ffb01f'
          },
          text: {
            primary: '#fdfeff',
            disabled: '#9ba3a0'
          },
          action: {
            disabled: 'rgba(55, 65, 81, 0.26)',
            selectedOpacity: 0.08
          }
      },
      typography: {
        fontFamily: `'Inter', 'Segoe UI', 'sans-serif'`,
        button: {
          fontWeight: 600
        },
      }
    });
    themes.components = Paper()

    return (
       <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    )
}

