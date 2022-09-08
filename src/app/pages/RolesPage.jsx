import React from 'react';
import { Grid, TextField } from '@mui/material';

const RolesPage = () => {
    return (
        <form>
            <Grid container direction='column'>
                <Grid item sx={{ ml: 2, mt: 3 }} xs={6}>
                    A
                </Grid>

                <Grid item sx={{ ml: 2, mt: 3 }} xs={6}>
                    B
                </Grid>
                
            </Grid>
        </form>
    );
};

export default RolesPage;