import React from "react"
import PropTypes from "prop-types"
import ThemeContext from "../../context/ThemeContext"

const NavBarList = ({links, currNavSelected, handleNavSelectedChange}) => {
    const [theme, toggleTheme] = React.useContext(ThemeContext)

    return (
        <ul className={`navbar ${theme === 'dark' ? theme : ''}`}>
            {links.map((link, id) => {
                return (
                    <li key={id}>
                        <button className={`${currNavSelected === link ? 'active' : null}`} onClick={() => handleNavSelectedChange(link)}>{link}</button>
                    </li>
                )
            })}
        </ul>
    )
}

NavBarList.propTypes = {
    links: PropTypes.arrayOf(PropTypes.string).isRequired, 
    currNavSelected: PropTypes.string.isRequired,
    handleNavSelectedChange: PropTypes.func.isRequired 
}

export default NavBarList