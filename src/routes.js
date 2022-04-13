import React from 'react';

// icons
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';

// pages
const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/Bookings"));
const Profile = React.lazy(() => import("./pages/Profile"));
const Settings = React.lazy(() => import("./pages/Settings"));
const Services = React.lazy(() => import("./pages/Services"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const SignIn = React.lazy(() => import("./pages/SignIn"));

export const navBarRoutes = [
  {
    title: 'Home',
    path: '/',
    enabled: true,
    component: Home,
    icon: HomeIcon,
    private: true,
  },
  {
    title: 'Settings',
    path: '/settings',
    enabled: true,
    component: Settings,
    icon: SettingsIcon,
    private: true,
  }
];

export const allRoutes = [
  ...navBarRoutes,
  {
    title: 'Register',
    path: '/register',
    enabled: true,
    component: SignUp,
    private: false,
  },
  {
    title: 'Login',
    path: '/login',
    enabled: true,
    component: SignIn,
    private: false,
  },
  {
    title: "Profile",
    path: '/profile',
    enabled: true,
    component: Profile,
    private: true,
  }
]
