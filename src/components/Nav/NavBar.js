import React from "react"
import { Link } from "react-router-dom"
import {ThemeConsumer} from "../../context/ThemeContext"

 const NavBar = () => {
    return (
        <>
        <ThemeConsumer>
            {({theme, toggleTheme}) => (
                <nav className="nav container">
                    <ul className="nav__links">
                        <li className="h5 nav__link"><Link to="/">Popular</Link></li>
                        <li className="h5 nav__link nav__link--active"><Link to="/battle">Battle</Link></li>
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