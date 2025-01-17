import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilCheck,
  cilFeaturedPlaylist,
  cilOpentype,
  cilSpeedometer,
  cilUser,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  // {
  //   component: CNavItem,
  //   name: 'Dashboard',
  //   to: '/dashboard',
  //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: 'Manage Users',
    to: '/manage-users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Manage Vendors',
    to: '/manage-vendors',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Manage Blogs',
    to: '/blogs-management',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Categories',
    to: '/category-vendors',
    icon: <CIcon icon={cilFeaturedPlaylist} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Property Management',
    to: '/property',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Financial Management',
    to: '/financial',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Booking Management',
    to: '/booking',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'W9 Form Management',
    to: '/w9-form',
    icon: <CIcon icon={cilFeaturedPlaylist} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Support',
    icon: <CIcon icon={cilCheck} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Contact Us',
        to: '/contactUs',
      },
      {
        component: CNavItem,
        name: 'Broadcast',
        to: '/broadcast',
      },
      // {
      //   component: CNavItem,
      //   name: 'Feedback',
      //   to: '/feedback',
      // },
    ],
  },
]

export default _nav
