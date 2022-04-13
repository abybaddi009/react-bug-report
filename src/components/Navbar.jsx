import React from "react";
import {
  Avatar,
  Box,
  Link,
  Container,
  Toolbar,
  Typography,
  MenuItem,
  Tooltip,
  IconButton,
  Menu,
} from "@mui/material";
import { navBarRoutes } from "../routes";
import { NavLink, useLocation } from "react-router-dom";

import { logout, selectUser } from "../redux/features/user/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { push as pushLocation } from "redux-first-history";

export default () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleOpenUserMenu = (e) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "primary.main",
        zIndex: 2000
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              flexGrow: 1,
              color: "white"
            }}
          >
            App
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                marginLeft: "1rem",
              }}
            >
              {user.isAuthenticated && navBarRoutes.map((page) => (
                <Link
                  key={page.path}
                  component={NavLink}
                  to={page.path}
                  color="white"
                  underline="none"
                  variant="button"
                  sx={{ marginLeft: "2rem" }}
                >
                  {page.title}
                </Link>
              ))}
            </Box>
          </Box>
          {!['/login', '/register'].includes(location.pathname) && <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={`${user.details.firstname} ${user.details.lastname}`} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="profile" onClick={() => {
                handleCloseUserMenu();
                dispatch(pushLocation('/profile'));
              }}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem key="logout" onClick={() => {
                handleCloseUserMenu();
                dispatch(logout);
                dispatch(pushLocation('/login'));
              }}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>}
        </Toolbar>
      </Container>
    </Box>
  );
};
