import React from "react"
import Instruction from "../Instruction/Instruction"
import Player from "../Player/Player"
import BattleResults from "./BattleResults"
import Loading from "../Loading/Loading"


class Battle extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            error: "", 
            loading: false
        }
        this.handleClearUserNotFound = this.handleClearUserNotFound.bind(this)
        this.renderBattle = this.renderBattle.bind(this)
    }

    handleClearUserNotFound(){
        this.setState({
            error: "" 
        })
    }

    renderBattle(){
        if(this.state.loading){
            return <Loading text="Battling" /> 
        } else {
            return (
                <div className="battle container">  
                    <Instruction /> 
                    <Player handleBattle={this.handleBattle} error={this.state.error} clearUserNotFoundError={this.handleClearUserNotFound}/>
                </div>
            )
        }
    }

    render(){
        return (
            this.renderBattle()
        )
    }
}

export default Battle