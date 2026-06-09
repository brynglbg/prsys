import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { APP, PAGES } from '../../utils/constants'
import { findPathChain } from '../../utils/helpers'

const AppBreadcrumbs = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname
  const chain = findPathChain(PAGES, currentPath)

  return (
    <>
      {/* Home */}
      <li><button className="text-gray-400" onClick={() => navigate('/')}><APP.icon /></button></li>
      {/* Path chain */}
      {chain.map((p, index) => {
        const isActive = p.path === currentPath
        return (
          <li key={index}>
            {!isActive ?
              (<button className="text-gray-400" onClick={() => navigate(p.path)}>{p.name}</button>) :
              p.name
            }
          </li>
        )
      })}
    </>
  )
}

export default AppBreadcrumbs