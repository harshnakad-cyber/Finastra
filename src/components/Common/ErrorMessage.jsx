// src/components/Common/ErrorMessage.jsx
import { Box, Typography } from '@mui/material';

const ErrorMessage = ({ message }) => {
  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="400px"
    >
      <Typography color="error">
        {message || 'An error occurred'}
      </Typography>
    </Box>
  );
};

export default ErrorMessage;
