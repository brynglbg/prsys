import React, { useEffect, useState } from 'react'
import themes from 'daisyui/theme/object'

const ThemeList = () => {
  const themeList = Object.keys(themes).sort((a, b) =>
    a.localeCompare(b)
  )
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  )

  // apply theme + save it
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const handleChange = (e) => {
    setTheme(e.target.value)
  }

  return (
    <>
      <ul className="menu w-[100%]">
        {themeList.map((t) => (
          <li>
            <label key={t} className="flex gap-5 cursor-pointer items-center">
              <input
                name="theme-radios"
                className="radio radio-sm theme-controller"
                type="radio"
                value={t}
                checked={theme === t}
                onChange={handleChange}
              />
              {t}
            </label>
          </li>
        ))}
      </ul>
    </>
  )
}

export default ThemeList