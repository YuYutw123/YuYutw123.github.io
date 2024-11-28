import Giscus from '@giscus/react'
import * as React from 'react'

const id = 'inject-comments'

// Retrieve the theme configuration from localStorage
function getSavedTheme() {
    return window.localStorage.getItem('theme')
}

const Comments = () => {
    const [mounted, setMounted] = React.useState(false)
    const [theme, setTheme] = React.useState('light')

    // Effect to monitor `localStorage` changes
    React.useEffect(() => {
        const handleStorageChange = event => {
            if (event.key === 'theme') {
                setTheme(event.newValue || 'light')
            }
        }

        // Add event listener for storage changes
        window.addEventListener('storage', handleStorageChange)

        // Initial update
        setTheme(getSavedTheme())

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

// Author：liruifengv李瑞丰
// Link：https://juejin.cn/post/7359405432802607167
// Source：稀土掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
