import React from "react"

function useTheme(props){
    const [theme, setTheme] = React.useState(props)

    const toggleTheme = () => {
        setTheme((theme) => theme === 'light' ? 'dark' : 'light')
    }

    return {theme, toggleTheme}
}

export default useTheme