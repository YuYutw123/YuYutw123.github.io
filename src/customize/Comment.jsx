import Giscus from '@giscus/react'
import * as React from 'react'

const id = 'inject-comments'
let newTheme = 'auto'

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}
// Retrieve the theme configuration from localStorage
function getSavedTheme() {
  return window.localStorage.getItem('theme') || 'dark'
}

function checkTheme() {
  newTheme = getSavedTheme()
  if (newTheme === 'auto') newTheme = getSystemTheme()
  return newTheme
}

const Comments = () => {
  const [mounted, setMounted] = React.useState(false)
  const [theme, setTheme] = React.useState('dark')

  // Effect to monitor `localStorage` changes
  React.useEffect(() => {
    const handleStorageChange = event => {
      if (event.key === 'theme') {
        if (event.newValue === 'auto') {
          setTheme(getSystemTheme())
        } else {
          setTheme(event.newValue || 'light')
        }
      }
    }

    // Add event listener for storage changes
    window.addEventListener('storage', handleStorageChange)

    // Initial update
    setTheme(checkTheme())

    return () => {
      // Cleanup listener on unmount
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  // Ensure Giscus component is rendered only after the component is mounted
  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div id={id} className='w-full'>
      {mounted ? (
        <Giscus
          id={id}
          repo='YuYutw123/YuYutw123.github.io'
          repoId='R_kgDONUsJVg'
          category='General'
          categoryId='DIC_kwDONUsJVs4CkrUq'
          mapping='title'
          reactionsEnabled='1'
          emitMetadata='0'
          inputPosition='top'
          lang='en'
          loading='lazy'
          theme={theme}
        />
      ) : null}
    </div>
  )
}

export default Comments
