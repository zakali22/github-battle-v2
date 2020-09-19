import React from "react"
import Instruction from "../Instruction/Instruction"
import Player from "../Player/Player"
import BattleResults from "./BattleResults"
import Loading from "../Loading/Loading"
import {initBattle} from "../../utils/api"

class Battle extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            battle: false,
            playerData: {
                playerOne: null,
                playerTwo: null
            },
            error: "", 
            loading: false
        }
        this.handleBattle = this.handleBattle.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.handleClearUserNotFound = this.handleClearUserNotFound.bind(this)
        this.renderBattle = this.renderBattle.bind(this)
    }

    handleBattle(players){
        initBattle(players)
            .then(res => { 
                this.setState({
                    loading: true
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            playerData: {
                                playerOne: res[0],
                                playerTwo: res[1]
                            }
                        }, () => {
                            this.setState({
                                loading: false,
                                battle: true 
                            })
                        })
                    }, 1500)
                })
            })
            .catch(error => {
                this.setState({
                    error: error.message
                })
            })
        
    }

    handleReset(){
        this.setState({
            battle: false, 
            playerData: {
                playerOne: null, 
                playerTwo: null
            }
        })
    }

    handleClearUserNotFound(){
        this.setState({
            error: "" 
        })
    }

    renderBattle(){
        if(this.state.loading){
            return <Loading text="Battling" /> 
        } else if(this.state.battle){
            return (
                <div className="battle container">
                    <BattleResults players={this.state.playerData} resetPlayerBattle={this.handleReset}/>
                </div>
            )
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