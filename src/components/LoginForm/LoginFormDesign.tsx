import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, InputAdornment, IconButton } from '@mui/material';


const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 400,
        margin: 'auto',
        padding: 4,
        mt: 8,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>

      <Box component="form" noValidate autoComplete="off">
        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          variant="outlined"
        />
         
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
  Don’t have an account?{' '}
  <Box component="a" href="/signup" sx={{ textDecoration: 'none', color: 'primary.main' }}>
    Sign Up
  </Box>
</Typography>
      </Box>
    </Paper>
  );
};

export default LoginForm;

