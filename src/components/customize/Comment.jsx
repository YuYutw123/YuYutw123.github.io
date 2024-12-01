import Giscus from '@giscus/react'
import { useEffect, useState } from 'react'

const getSystemTheme = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

const getSavedTheme = () => window.localStorage.getItem('theme') || 'dark'

const Comments = () => {
    const [mounted, setMounted] = useState(false)
    const [theme, setTheme] = useState('auto')

    // If theme == auto, then get systemtheme, to prevent giscus theme error
    useEffect(() => {
        const handleStorageChange = event => {
            if (event.key === 'theme') {
                const newTheme =
                    event.newValue === 'auto'
                        ? getSystemTheme()
                        : event.newValue || 'light'
                setTheme(newTheme)
            }
        }

        window.addEventListener('storage', handleStorageChange)

        // Initial theme setup
        setTheme(
            getSavedTheme() === 'auto' ? getSystemTheme() : getSavedTheme(),
        )

        return () => window.removeEventListener('storage', handleStorageChange)
    }, [])

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div id='inject-comments' className='w-full'>
            {mounted && (
                <Giscus
                    id='inject-comments'
                    repo='YuYutw123/YuYutw123.github.io'
                    repoId='R_kgDONUsJVg'
                    category='Announcements'
                    categoryId='DIC_kwDONUsJVs4CkrUq'
                    mapping='title'
                    reactionsEnabled='1'
                    emitMetadata='0'
                    inputPosition='top'
                    lang='en'
                    loading='lazy'
                    crossorigin='anonymous'
                    theme={theme === 'auto' ? getSystemTheme() : theme}
                />
            )}
        </div>
    )
}

export default Comments
