import React from "react"
import Instruction from "../Instruction/Instruction"
import Player from "../Player/Player"
import BattleResults from "./BattleResults"
import {initBattle} from "../../utils/api"

class Battle extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            battle: false,
            playerData: {
                playerOne: null,
                playerTwo: null
            } 
        }
        this.handleBattle = this.handleBattle.bind(this)
        this.handleReset = this.handleReset.bind(this)
    }

    handleBattle(players){
        initBattle(players)
            .then(res => {
                console.log(res)
                this.setState({
                    playerData: {
                        playerOne: res[0],
                        playerTwo: res[1]
                    }
                }, () => {
                    this.setState({
                        battle: true
                    })
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

    render(){
        if(this.state.battle){
            return <BattleResults players={this.state.playerData} resetPlayerBattle={this.handleReset}/>
        }
        return (
            <React.Fragment>
                <Instruction /> 
                <Player handleBattle={this.handleBattle}/>
            </React.Fragment>
        )
    }
}

export default Battle