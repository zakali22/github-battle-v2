import React from "react"
import PlayerInput from "./PlayerInput"
import PlayerReview from "./PlayerReview"
import {fetchUser} from "../../utils/api"

class Player extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            players: {
                playerOne: null,
                playerTwo: null
            },
            error: ''
        }
        this.handlePlayerSubmission = this.handlePlayerSubmission.bind(this)
        this.handleUserClearing = this.handleUserClearing.bind(this)
    }

    handlePlayerSubmission(username, player) {
        this.setState((state) => ({
            players: {
                ...state.players,
                [player]: username
            }
        }))
    }

    handleUserClearing(player){
        this.setState((state) => ({
            players: {
                ...state.players,
                [player]: null
            }
        }))
    }

    render(){
        return (
            <div className="player">
                <h3 className="player__title">Players</h3>
                <div className="player__listing">
                    {this.state.players['playerOne'] ? <PlayerReview clearUser={() => this.handleUserClearing('playerOne')} username={this.state.players['playerOne']}/> : <PlayerInput label="Player One" submitPlayer={(username) => this.handlePlayerSubmission(username, "playerOne")}/>}
                    {this.state.players['playerTwo'] ? <PlayerReview clearUser={() => this.handleUserClearing('playerTwo')} username={this.state.players['playerTwo']} /> : <PlayerInput label="Player Two" submitPlayer={(username) => this.handlePlayerSubmission(username, "playerTwo")} />}
                </div>
                {this.state.players.playerOne && this.state.players.playerTwo ? <button className="player__btn btn btn--primary">Battle</button> : null}
            </div>
        )
    }
}

export default Player