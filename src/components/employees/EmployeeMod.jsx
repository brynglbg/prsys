import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getEmployeeDepartments, getEmployeePositions } from '../../services/EmployeesServices'
import * as BsIcons from 'react-icons/bs'

const EmployeeMod = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  // 
  const [departments, setDepartments] = useState([])
  const [positions, setPositions] = useState([])
  // 
  const [firstname, setFirstName] = useState('')
  const [middlename, setMiddleName] = useState('')
  const [lastname, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [department, setDepartment] = useState('')
  const [position, setPosition] = useState('')
  // 
  const [firstnameError, setFirstNameError] = useState(false)
  const [lastnameError, setLastNameError] = useState(false)
  const [steponeError, setStepOneError] = useState(false)
  const [steptwoError, setStepTwoError] = useState(false)
  const [stepthreeError, setStepThreeError] = useState(false)
  const [stepfourError, setStepFourError] = useState(false)

  useEffect(() => {
    async function fetchEmployeeDepartments() {
      const { data, error } = await getEmployeeDepartments()
      setDepartments(data)
    }
    fetchEmployeeDepartments()

    async function fetchEmployeePositions() {
      const { data, error } = await getEmployeePositions()
      setPositions(data)
    }
    fetchEmployeePositions()
  }, [])


  function handleStepOne(e) {
    e.preventDefault()
    nextStep(2)
  }
  function handleStepTwo(e) {
    e.preventDefault()
    nextStep(3)
  }
  function handleStepThree(e) {
    e.preventDefault()
    nextStep(4)
  }
  function handleStepFour(e) {
    e.preventDefault()
  }
  function nextStep(stepNo) {
    let isValid = true;
    if (stepNo > 1) {
      if (!firstname) {
        setFirstNameError(true)
        isValid = false
      } else {
        setFirstNameError(false)
      }
      if (!lastname) {
        setLastNameError(true)
        isValid = false
      } else {
        setLastNameError(false)
      }
      if (!isValid) {
        setStepOneError(true)
        return
      } else {
        setStepOneError(false)
      }
    }
    setStep(stepNo)
  }

  return (
    <>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12">
          <div className="card">
            <div className="card-body gap-5">
              <div className="flex items-center justify-between gap-5">
                <span className="text-lg font-bold">Add Employee</span>
                <button className="btn btn-sm" onClick={() => navigate('/employees')}>Cancel</button>
              </div>
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 lg:col-span-3">
                  <div className="overflow-x-auto">
                    <div className="steps steps-horizontal lg:steps-vertical w-full">
                      <button className={`step step1 ${step >= 1 ? 'step-primary' : ''}`} onClick={() => nextStep(1)}>Personal Information</button>
                      <button className={`step step2 ${step >= 2 ? 'step-primary' : ''}`} onClick={() => nextStep(2)}>Contact Details</button>
                      <button className={`step step3 ${step >= 3 ? 'step-primary' : ''}`} onClick={() => nextStep(3)}>Employment Details</button>
                      <button className={`step step4 ${step >= 4 ? 'step-primary' : ''}`} onClick={() => nextStep(4)}>Others</button>
                    </div>
                  </div>
                </div>
                <div className="col-span-12 lg:col-span-9">
                  {step === 1 && (
                    <>
                      <form className="flex flex-col gap-5" onSubmit={handleStepOne}>
                        <div className={`alert alert-error alert-soft ${ !steponeError ? 'hidden' : '' }`} role="alert">
                          <BsIcons.BsXCircle className="text-2xl" />
                          <span>First and last name are required.</span>
                        </div>
                        <div className="grid grid-cols-12 gap-5">
                          <div className="col-span-12">
                            <i className="text-lg underline">Personal Information</i>
                          </div>
                          <div className="col-span-12 lg:col-span-4">
                            <label htmlFor="emp-first_name">First Name <span className="text-error">*</span></label>
                            <input
                              id="emp-first_name"
                              className={`input ${ firstnameError ? 'input-error' : '' }`}
                              type="text"
                              placeholder="e.g. John"
                              value={firstname}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </div>
                          <div className="col-span-12 lg:col-span-4">
                            <label htmlFor="emp-middle_name">Middle Name</label>
                            <input
                              id="emp-middle_name"
                              className="input"
                              type="text"
                              placeholder="e.g. Dough"
                              value={middlename}
                              onChange={(e) => setMiddleName(e.target.value)}
                            />
                          </div>
                          <div className="col-span-12 lg:col-span-4">
                            <label htmlFor="emp-last_name">Last Name <span className="text-error">*</span></label>
                            <input
                              id="emp-last_name"
                              className={`input ${ lastnameError ? 'input-error' : '' }`}
                              type="text"
                              placeholder="e.g. Doe"
                              value={lastname}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </div>
                          <div className="col-span-12">
                            <label htmlFor="emp-address">Address</label>
                            <textarea
                              id="emp-address"
                              className="textarea min-h-[100px]"
                              type="text"
                              placeholder="e.g. USA"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="btn btn-sm btn-neutral ms-auto" type="submit">Next<BsIcons.BsChevronRight className="ms-2" /></button>
                        </div>
                      </form>
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <form className="flex flex-col gap-5" onSubmit={handleStepTwo}>
                        <div className={`alert alert-error alert-soft ${ !steptwoError ? 'hidden' : '' }`} role="alert">
                          <BsIcons.BsXCircle className="text-2xl" />
                          <span>Enter a valid email or phone number, or leave it blank.</span>
                        </div>
                        <div className="grid grid-cols-12 gap-5">
                          <div className="col-span-12">
                            <i className="text-lg underline">Contact Details</i>
                          </div>
                          <div className="col-span-12 lg:col-span-4">
                            <label htmlFor="emp-email">Email</label>
                            <input
                              id="emp-email"
                              className="input validator"
                              type="email"
                              placeholder="e.g. mail@site.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="validator-hint hidden">Enter valid email address</div>
                          </div>
                          <div className="col-span-12 lg:col-span-4">
                            <label htmlFor="emp-phone">Phone No.</label>
                            <input
                              id="emp-phone"
                              className="input validator"
                              type="tel"
                              placeholder="e.g. 09123456789"
                              pattern="[0-9]*"
                              minLength="11"
                              maxLength="11"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                            <div className="validator-hint hidden">Enter a valid phone number with exactly 11 digits</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="btn btn-sm ms-auto" type="button" onClick={() => setStep(1)}><BsIcons.BsArrowLeft className="me-2" />Prev</button>
                          <button className="btn btn-sm btn-neutral ms-2" type="submit">Next<BsIcons.BsChevronRight className="ms-2" /></button>
                        </div>
                      </form>
                    </>
                  )}
                  {step === 3 && (
                    <>
                      <form className="flex flex-col gap-5" onSubmit={handleStepThree}>
                        <div className={`alert alert-error alert-soft ${ !stepthreeError ? 'hidden' : '' }`} role="alert">
                          <BsIcons.BsXCircle className="text-2xl" />
                          <span>First and last name are required.</span>
                        </div>
                        <div className="grid grid-cols-12 gap-5">
                          <div className="col-span-12">
                            <i className="text-lg underline">Employment Details</i>
                          </div>
                          <div className="col-span-12 lg:col-span-4">
                            <label htmlFor="emp-department">Department</label>
                            <select
                              id="emp-department"
                              className="select"
                              value={department}
                              onChange={(e) => setDepartment(e.target.value)}
                            >
                              <option value="">None</option>
                              {departments.map(dept => (
                                <option key={dept.id} value={dept.id}>{dept.name}</option>
                              ))}
                            </select>
                          </div>
                          <div className="col-span-12 lg:col-span-4">
                            <label htmlFor="emp-position">Position</label>
                            <select
                              id="emp-position"
                              className="select"
                              value={position}
                              onChange={(e) => setPosition(e.target.value)}
                            >
                              <option value="">None</option>
                              {positions.map(pos => (
                                <option key={pos.id} value={pos.id}>{pos.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="btn btn-sm ms-auto" type="button" onClick={() => setStep(2)}><BsIcons.BsArrowLeft className="me-2" />Prev</button>
                          <button className="btn btn-sm btn-neutral ms-2" type="submit">Next<BsIcons.BsChevronRight className="ms-2" /></button>
                        </div>
                      </form>
                    </>
                  )}
                  {step === 4 && (
                    <>
                      <form className="flex flex-col gap-5" onSubmit={handleStepFour}>
                        <div className={`alert alert-error alert-soft ${ !stepfourError ? 'hidden' : '' }`} role="alert">
                          <BsIcons.BsXCircle className="text-2xl" />
                          <span>First and last name are required.</span>
                        </div>
                        <div className="grid grid-cols-12 gap-5">
                          <div className="col-span-12">
                            <i className="text-lg underline">Employment Details</i>
                          </div>
                          <div className="col-span-12 lg:col-span-4">
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="btn btn-sm ms-auto" type="button" onClick={() => setStep(3)}><BsIcons.BsArrowLeft className="me-2" />Prev</button>
                          <button className="btn btn-sm btn-info ms-2" type="submit">Finish<BsIcons.BsChevronRight className="ms-2" /></button>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EmployeeMod