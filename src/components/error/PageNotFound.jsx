import { useNavigate } from 'react-router-dom'
import * as BsIcons from 'react-icons/bs'

const PageNotFound = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className="h-screen flex flex-col gap-5 items-center justify-center bg-base-200 text-base-content text-center">
        <h1 className="text-[10rem] font-thin drop-shadow-xl">404</h1>
        <p className="text-3xl font-thin">Page not found</p>
        <button className="btn" onClick={() => navigate('/')}><BsIcons.BsChevronLeft className="me-1" />Go Back</button>
      </div>
    </>
  )
}

export default PageNotFound