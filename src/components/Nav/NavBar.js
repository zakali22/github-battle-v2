import React from "react"
import {ThemeConsumer} from "../../context/ThemeContext"

 const NavBar = () => {
    return (
        <>
        <ThemeConsumer>
            {({theme, toggleTheme}) => (
                <nav className="nav container">
                    <ul className="nav__links">
                        <li className="h5 nav__link">Popular</li>
                        <li className="h5 nav__link nav__link--active">Battle</li>
                    </ul>
                    {
                        theme === 'light' ? 
                            (<button className="nav__theme-btn" onClick={() => toggleTheme()}>🔦 </button>) : 
                            (<button className="nav__theme-btn" onClick={() => toggleTheme()}>💡 </button>)
                    }
                </nav>
            )}
        </ThemeConsumer>
        </>
    )
 }

 export default NavBar