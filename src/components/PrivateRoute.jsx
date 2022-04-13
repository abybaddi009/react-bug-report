import { Box, Container, LinearProgress, Skeleton } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectUser } from '../redux/features/user/UserSlice';

export default ({ children }) => {
  let location = useLocation();

  const { isAuthenticated, status } = useSelector(selectUser);

  if (status !== 'idle') {
    return <>
      <Container maxWidth="sm">
        <Box sx={{ mt: 2, width: "100%", height: '100vh', display: "flex", flexDirection: "column" }}>
          <LinearProgress />
          <Box sx={{ width: "100%" }}>
            <Skeleton variant="text" sx={{ mt: 1, mb: 1 }} />
            <Skeleton variant="rectangular" height={80} sx={{ mt: 1, mb: 1 }} />
          </Box>
          <Skeleton variant="circular" height={40} width={40} sx={{ mt: 1, mb: 1 }} />
        </Box>
      </Container>
    </>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
