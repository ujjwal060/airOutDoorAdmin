import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const UserManagement = React.lazy(() => import('./views/userManagement/UserManagement'))
const VendorManagement = React.lazy(() => import('./views/vendorManagement/vendorManagement'))
const Species=React.lazy(()=>import('./views/speciesandextension/species'))
const Extension=React.lazy(()=>import('./views/speciesandextension/extension'))
const New = React.lazy(() => import('./views/vendorManagement/new'))
const AnalyticsReporting = React.lazy(() => import('./views/analytics&Reporting/Analytics&Reporting'))
const financial=React.lazy(()=>import('./views/financial/financial'))
const content=React.lazy(()=>import('./views/ContentManage/content '))
const ContactUs=React.lazy(()=>import('./views/support/contactUs'))
const Broadcast=React.lazy(()=>import('./views/support/brodcast'))
const feedback=React.lazy(()=>import('./views/support/feedback'))
const property=React.lazy(()=>import('./views/Property/property'))
const bookings=React.lazy(()=>import('./views/BookingsManage/bookings'))



const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/Species', name: 'Species', element: Species },
  { path: '/Extension', name: 'Extension', element: Extension },
  { path: '/manage-users', name: 'Manage Users', element: UserManagement },
  { path: '/manage-vendors', name: 'Manage Vendors', element: VendorManagement },
  { path: '/new', name: 'New', element: New },
  { path: '/analytics&Reporting', name: 'Analytics&Reporting', element: AnalyticsReporting },
  { path: '/financial', name: 'Financial', element: financial },
  { path: '/content', name: 'Content Management', element: content },
  { path: '/contactUs', name: 'ContactUs', element: ContactUs },
  { path: '/broadcast', name: 'Broadcast', element: Broadcast }, 
  { path: '/feedback', name: 'Feedback', element: feedback },
  { path: '/property', name: 'Property', element: property },
  { path: '/booking', name: 'Bookings', element: bookings },

]

export default routes
