import * as BsIcons from 'react-icons/bs'
import Dashboard from '../components/dashboard/Dashboard'
import EmployeeList from '../components/employees/EmployeeList'
import EmployeeMod from '../components/employees/EmployeeMod'
import PayrollList from '../components/payroll/PayrollList'

export const APP = {
  name: 'PRSYS',
  icon: BsIcons.BsLayers
}

export const PAGES = [
  {
    show: true,
    name: 'Dashboard',
    icon: BsIcons.BsGrid1X2,
    path: '/dashboard',
    element: Dashboard,
    items: []
  },
  {
    show: true,
    name: 'Employees',
    icon: BsIcons.BsPersonVcard,
    path: '/employees',
    element: EmployeeList,
    items: [
      {
        show: false,
        name: 'Add Employees',
        path: '/employees/add',
        element: EmployeeMod,
        items: []
      },
      {
        show: false,
        name: 'Edit Employees',
        path: '/employees/edit/:id',
        element: EmployeeMod,
        items: []
      }
    ]
  },
  {
    show: true,
    name: 'Payroll',
    icon: BsIcons.BsCash,
    path: '/payroll',
    element: PayrollList,
    items: []
  }
]

export const ROUTES = Object.fromEntries(PAGES.map(p => [p.name, p.path]))

export const SIDEBAR = PAGES.filter(p => p.show).map(p => ({
  name: p.name,
  icon: p.icon,
  path: p.path,
  items: p.items
}))