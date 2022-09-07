import { purpleTheme } from './purpleTheme';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

export const AppTheme = ({ children }) => {
    return(
        <ThemeProvider theme={ purpleTheme }>
            <CssBaseline />
            { children }
        </ThemeProvider>
    );
};