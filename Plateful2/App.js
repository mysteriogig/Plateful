import React from 'react';
import { ThemeProvider } from 'styled-components'; 
import AppNavigation from './navigation/appNavigation'; 
import { theme } from '../Plateful2/theme/index'; 
export default function App() {
  return (
    <ThemeProvider theme={theme}>  
      <AppNavigation />  
    </ThemeProvider>
  );
}
