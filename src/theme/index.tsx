
import {PropsWithChildren } from 'react';

// material-ui
import { CssBaseline, StyledEngineProvider, Theme } from '@mui/material';
import { alpha, createTheme, ThemeProvider } from '@mui/material/styles';

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
function TableCell(theme: Theme) {
  return {
      MuiTableCell : {
          styleOverrides: {
              root: {
                borderBottom: `1px solid ${alpha(theme.palette.primary.light, .2)}`
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
          divider: '#757575',
          primary: {
            main: '#0db981',
            light: '#18b79e'
          },
          secondary: {
            main: '#54657b',
            light: '#6d7c8f'
          },
          text: {
            primary: '#FDFEFF',
            disabled: '#9BA3A0'
          },
          action: {
            disabled: '#9BA3A0',
            selectedOpacity: 0.08,
            hoverOpacity: 0.2
          }
      },
      typography: {
        fontFamily: `'Inter', 'Segoe UI', 'sans-serif'`,
        button: {
          fontWeight: 600,
          textTransform: "capitalize"
        },
        h1: {
          fontWeight: 600,
          fontSize: '2.375rem',
          lineHeight: 1.21
        },
        h2: {
            fontWeight: 500,
            fontSize: '1.875rem',
            lineHeight: 1.27
        },
        h3: {
            fontWeight: 500,
            fontSize: '1.5rem',
            lineHeight: 1.33
        },
        h4: {
            fontWeight: 500,
            fontSize: '1.25rem',
            lineHeight: 1.4
        },
        h5: {
            fontWeight: 500,
            fontSize: '1rem',
            lineHeight: 1.5
        },
        h6: {
            fontWeight: 500,
            fontSize: '0.875rem',
            lineHeight: 1.57
        },
        caption: {
            fontWeight: 400,
            fontSize: '0.75rem',
            lineHeight: 1.66
        },
        body1: {
            fontSize: '0.875rem',
            lineHeight: 1.57
        },
        body2: {
            fontSize: '0.75rem',
            lineHeight: 1.66
        },
        subtitle1: {
            fontSize: '0.875rem',
            lineHeight: 1.57
        },
        subtitle2: {
            fontSize: '0.75rem',
            fontWeight: 500,
            lineHeight: 1.66,
        },
        overline: {
            lineHeight: 1.66
        },
      }
    });
    themes.components =  Object.assign(
      Paper(),
      TableCell(themes)
    )

    return (
       <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    )
}

