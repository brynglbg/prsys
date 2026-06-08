import { SupabaseServices } from './SupabaseServices';

// employees
export async function getEmployees(){
  const { data, error } = await SupabaseServices
    .from('employees')
    .select(`*, employee_departments (*), employee_positions (*)`)
  return { data, error }
}

// employee departments
export async function getEmployeeDepartments(){
  const { data, error } = await SupabaseServices
    .from('employee_departments')
    .select(`*`)
  return { data, error }
}

// employee positions
export async function getEmployeePositions(){
  const { data, error } = await SupabaseServices
    .from('employee_positions')
    .select(`*`)
  return { data, error }
}