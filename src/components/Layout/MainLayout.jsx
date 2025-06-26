// src/components/Layout/MainLayout.jsx
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const MainLayout = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      width: '100vw',
      maxWidth: '100%',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      bgcolor: 'rgb(245, 238, 238)'
    }}>
      <Header />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          width: '100%',
          overflowX: 'hidden'
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
