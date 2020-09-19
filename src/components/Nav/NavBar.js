import React from "react"
import { Link, withRouter } from "react-router-dom"
import {ThemeConsumer} from "../../context/ThemeContext"

 const NavBar = ({history, location, match}) => {
     console.log(match)
    return (
        <ThemeConsumer>
            {({theme, toggleTheme}) => (
                <nav className="nav container">
                    <ul className="nav__links">
                        <li className={`h5 nav__link ${location.pathname === '/'  ? 'nav__link--active' : ''}`}><Link to="/">Popular</Link></li>
                        <li className={`h5 nav__link ${location.pathname === '/battle' ? 'nav__link--active' : ''}`}><Link to="/battle">Battle</Link></li>
                    </ul>
                    {
                        theme === 'light' ? 
                            (<button className="nav__theme-btn" onClick={() => toggleTheme()}>🔦 </button>) : 
                            (<button className="nav__theme-btn" onClick={() => toggleTheme()}>💡 </button>)
                    }
                </nav>
            )}
        </ThemeConsumer>
    )
 }

 export default withRouter(NavBar)