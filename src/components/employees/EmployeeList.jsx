import { useEffect, useState } from 'react'
import { getEmployees } from '../../services/EmployeesServices'
import { useNavigate } from 'react-router-dom'
import * as BsIcons from 'react-icons/bs'

const EmployeeList = () => {
  const navigate = useNavigate()
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    async function fetchEmployees() {
      const result = await getEmployees()
      if (result.error) {
        console.log(result.error)
        return
      }
      setEmployees(result.data)
    }
    fetchEmployees()
  }, [])

  return (
    <>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12">
          <div className="card">
            <div className="card-body gap-5">
              <div className="flex items-center justify-between gap-5">
                <span className="text-lg font-bold">Employee List</span>
                <button className="btn btn-sm" onClick={() => navigate('/employees/add')}>Add Employee</button>
              </div>
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Employee No.</th>
                      <th>Employee Name</th>
                      <th>Department</th>
                      <th>Position</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map(emp => (
                      <tr key={emp.id}>
                        <td>{emp.id}</td>
                        <td>{emp.last_name}, {emp.first_name}</td>
                        <td>{emp.employee_departments?.name}</td>
                        <td>{emp.employee_positions?.name}</td>
                        <td>
                          <button className="btn btn-xs"><BsIcons.BsThreeDots /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EmployeeList