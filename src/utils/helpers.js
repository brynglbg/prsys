import { matchPath } from 'react-router-dom'
import { APP, PAGES } from './constants'

export const findPathChain = (pages, currentPath) => {
  for (const page of pages) {
    const isMatch = matchPath(
      { path: page.path, end: true },
      currentPath
    )

    // if match, return this page in chain
    if (isMatch) {
      return [page]
    }

    // check children
    if (page.items?.length) {
      const childChain = findPathChain(page.items, currentPath)

      if (childChain.length) {
        return [page, ...childChain]
      }
    }
  }

  return []
}

export const getPageTitle = () => {
  const currentPath = window.location.pathname

  const chain = findPathChain(PAGES, currentPath)

  if (!chain.length) return APP.name

  const names = chain
    .map((p) => p.name)
    .filter(Boolean)
    .join(' - ')

  return names ? `${APP.name} | ${names}` : APP.name
}