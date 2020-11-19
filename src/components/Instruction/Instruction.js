import React, {Component} from "react"
import {FiUsers} from "react-icons/fi"
import {FaFighterJet, FaTrophy} from "react-icons/fa"
import ThemeContext from "../../context/ThemeContext"

function Instruction(){
    const {theme, toggleTheme} = React.useContext(ThemeContext)

    return (
        <div className="battle__instruction">
            <h1 className="h3 battle__instruction-heading">Instruction</h1>
            <div className="battle__instruction-listing">
                <div className="battle__instruction-listing-item">
                    <h4>Enter two Github users</h4>
                    <div className={`${theme === 'dark' ? theme : ''} battle__instruction-listing-icons`}>
                        <FiUsers color="coral" size={100}/>
                    </div>
                </div>
                <div className="battle__instruction-listing-item">
                    <h4>Battle</h4>
                    <div className={`${theme === 'dark' ? theme : ''} battle__instruction-listing-icons`}>
                        <FaFighterJet color="grey" size={100}/>
                    </div>
                </div>
                <div className="battle__instruction-listing-item">
                    <h4>See the winner</h4>
                    <div className={`${theme === 'dark' ? theme : ''} battle__instruction-listing-icons`}>
                        <FaTrophy color="yellow" size={100}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Instruction