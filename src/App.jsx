import React from 'react';
import { AppTheme } from '../src/ui/theme/AppTheme';
import AppRouter from './router/AppRouter';

const App = () => {
    return (
        <AppTheme>
            <AppRouter />
        </AppTheme>
    );
};

export default App;