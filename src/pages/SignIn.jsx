import React from 'react';
import { Avatar, Box, Button, Grid, Link, Paper, InputAdornment, TextField, Typography, Divider } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { useDispatch } from 'react-redux';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { push as pushLocation } from "redux-first-history";

import Copyright from "../components/Copyright";
import OtpInput from "../components/OTPInput";

import { fetchUserAsync } from "../redux/features/user/UserSlice";

export default () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const locationState = location.state;
  const [formData, setFormData] = React.useState({ phone: "", OTP: "" });
  const [OTP, setOTP] = React.useState("");

  const { from } = locationState || {
    from: { pathname: "/" }
  };

  const handleFormValuesChange = (e) => {
    setFormData(oldState => ({ ...oldState, [e.target.name]: e.target.value }));
  }

  const handleOTPChange = (otp) => {
    setFormData(oldState => ({ ...oldState, OTP: otp }));
  };

  const handleGetOTP = (value) => {
    setOTP(value);
    setFormData(oldState => ({ ...oldState, OTP: "" }));
  }

  const handleChangeNumber = () => {
    setOTP("");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.phone !== "" && formData.OTP !== "") {
      dispatch(fetchUserAsync({ phone: formData.phone, firstname: "", lastname: "" }));
      dispatch(pushLocation(from, { replace: true }));
    }
  };

  return (
    <Grid container component="main" sx={{ height: '91vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome to
          </Typography>
          <Typography component="h1" variant="h5">
            App
          </Typography>
          <Divider variant="middle" />
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, display: 'flex', flexDirection: 'column' }}>
            {OTP === "" && <>
              <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Phone number"
                name="phone"
                value={formData.phone}
                onChange={handleFormValuesChange}
                autoComplete="phone"
                autoFocus
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">+1</InputAdornment>,
                }}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleGetOTP}
              >
                Get OTP
              </Button>
            </>}
            {OTP !== "" &&
              <>
                <Typography variant="body2" component="p" sx={{ mt: 3 }}>Enter OTP:</Typography>
                <OtpInput
                  value={formData.OTP}
                  onChange={handleOTPChange}
                  separator={
                    <span>
                      <strong>-</strong>
                    </span>
                  }
                  inputStyle={{
                    width: "2rem",
                    height: "2rem",
                    margin: "1rem 1rem",
                    fontSize: "1.5rem",
                    borderRadius: 4,
                    border: "1px solid #1976d2",
                  }}
                  // isInputSecure={true}
                  isInputNum={true}
                  errorStyle={{
                    width: "2rem",
                    height: "2rem",
                    margin: "1rem 1rem",
                    fontSize: "1.5rem",
                    borderRadius: 4,
                    border: "1px solid rgba(1,0,0,0.3)",
                  }}
                />
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleGetOTP}
                >
                  Resend OTP
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleChangeNumber}
                >
                  Change number
                </Button>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </>
            }
            <Grid container>
              <Grid item>
                <Link component={RouterLink} to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid >
  );
}
