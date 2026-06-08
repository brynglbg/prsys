import * as BsIcons from 'react-icons/bs'

export const APP_NAME = 'PRSYS'

export const ROUTES = {
  // Protected
  DASHBOARD: '/dashboard',
  EMPLOYEES: '/employees',
  EMPLOYEES_ADD: '/employees/add',
  EMPLOYEES_EDIT: '/employees/edit/:id',
  // Global
  SIGNIN: '/',
  SIGNOUT: '/signout'
}

export const PAGE_TITLES = [
  {
    path: ROUTES.DASHBOARD,
    nav1: 'Dashboard',
    nav2: ''
  },
  {
    path: ROUTES.EMPLOYEES,
    nav1: 'Employees',
    nav2: 'Employee List'
  },
  {
    path: ROUTES.EMPLOYEES_ADD,
    nav1: 'Employees',
    nav2: 'Add Employee'
  },
  {
    path: ROUTES.EMPLOYEES_EDIT,
    nav1: 'Employees',
    nav2: 'Edit Employee'
  }
]

export const SIDEBAR_MENU = [
  {
    name: 'Dashboard',
    path: ROUTES.DASHBOARD,
    icon: BsIcons.BsGrid1X2
  },
  {
    name: 'Employees',
    path: ROUTES.EMPLOYEES,
    icon: BsIcons.BsPersonVcard
  }
]