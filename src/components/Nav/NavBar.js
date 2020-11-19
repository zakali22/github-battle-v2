import React from "react"
import { Link, withRouter } from "react-router-dom"
import ThemeContext from "../../context/ThemeContext"

 const NavBar = ({history, location, match}) => {
    const {theme, toggleTheme} = React.useContext(ThemeContext)

    return (
        <nav className="nav container">
            <ul className="nav__links">
                <li className={`h5 nav__link ${location.pathname === '/'  ? 'nav__link--active' : ''}`}><Link to="/">Popular</Link></li>
                <li className={`h5 nav__link ${location.pathname === '/battle' || location.pathname === '/battle/result' ? 'nav__link--active' : ''}`}><Link to="/battle">Battle</Link></li>
            </ul>
            {
                theme === 'light' ? 
                    (<button className="nav__theme-btn" onClick={() => toggleTheme()}>🔦 </button>) : 
                    (<button className="nav__theme-btn" onClick={() => toggleTheme()}>💡 </button>)
            }
        </nav>
    )
 }

 export default withRouter(NavBar)