import React from "react"
import Nav from "../Nav/NavBar"
import {ThemeConsumer} from "../../context/ThemeContext"

function Layout({children}){ 
    return (
        <ThemeConsumer>
            {({theme}) => (
                <div className={`${theme === 'dark' ? theme : ''} page-layout`}>
                    <Nav />
                    {children}
                </div>
            )}
        </ThemeConsumer>
    )
}

export default Layout