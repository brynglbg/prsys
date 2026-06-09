import React from 'react'
import * as BsIcons from 'react-icons/bs'
import { APP } from '../../utils/constants'

const AppCopyright = () => {
  return (
    <>
      <span className="flex items-center text-gray-400 text-xs">@ {APP.name}</span>
    </>
  )
}

export default AppCopyright