import { matchPath } from 'react-router-dom'
import { APP_NAME, PAGE_TITLES } from './constants'

export const getPageTitle = (currentPath) => {
  const page = PAGE_TITLES.find((p) =>
    matchPath({ path: p.path, end: true }, currentPath)
  )

  if (!page) return APP_NAME

  const { nav1, nav2 } = page

  if (!nav1 && !nav2) return APP_NAME
  if (nav1 && !nav2) return `${APP_NAME} | ${nav1}`
  if (nav1 && nav2) return `${APP_NAME} | ${nav1} - ${nav2}`

  return APP_NAME
}