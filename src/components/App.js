import React from "react"
import NavBar from "./NavBar/NavBar.js"
import Instruction from "./Instruction/Instruction.js"
import Player from "./Player/Player.js"

const App = () => {
    return (
        <div className="battle container">
            <Instruction /> 
            <Player />
        </div>
    )
}

export default App;