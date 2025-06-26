// src/components/Layout/Header.jsx
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Typography, 
  Box 
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import DescriptionIcon from '@mui/icons-material/Description';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../config/supabase';

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        bgcolor: '#1976d2',
        width: '100vw',
        maxWidth: '100%',
        margin: 0,
        padding: 0,
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 4 } }}>
        <DescriptionIcon sx={{ mr: 2 }} />
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            flexGrow: 1,
            fontWeight: 700
          }}
        >
          Finastra
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/"
          >
            HOME
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/about"
          >
            ABOUT
          </Button>
          {user && (
            <>
              <Button 
                component={RouterLink} 
                to="/create"
                variant="outlined"
                sx={{ 
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255, 255, 255, 0.08)'
                  }
                }}
              >
                CREATE NEW
              </Button>
              <Button 
                color="inherit"
                onClick={handleLogout}
              >
                LOGOUT
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
