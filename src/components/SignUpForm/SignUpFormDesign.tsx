import React from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

const SignUpForm: React.FC = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 400,
        margin: 'auto',
        padding: 4,
        mt: 4,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Sign Up
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
        <TextField
          fullWidth
          label="Confirm Password"
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
          Already have an account?{' '}
          <Box component="a" href="/login" sx={{ textDecoration: 'none', color: 'primary.main' }}>
            Login
          </Box>
        </Typography>
      </Box>
    </Paper>
  );
};

export default SignUpForm;
