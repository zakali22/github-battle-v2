import React from "react"
import Nav from "../Nav/NavBar"
import ThemeContext from "../../context/ThemeContext"

function Layout({children}){ 
    const {theme, toggleTheme} = React.useContext(ThemeContext)

    return (
        <div className={`${theme === 'dark' ? 'dark' : ''} page-layout`}>
            <Nav />
            {children}
        </div>
    )
}

export default Layout