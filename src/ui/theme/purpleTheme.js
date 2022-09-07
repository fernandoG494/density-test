import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material';

export const purpleTheme = createTheme({
    palette: {
        primary: {
            main: '#262254'
        },
        secondary: {
            main: '#543884'
        },
        background: {
            main: '#AC94F4'
        },
        error: {
            main: red[400]
        }
    }
});
