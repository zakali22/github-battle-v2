import React from "react"
import PropTypes from "prop-types"
import PlayerInput from "./PlayerInput"
import PlayerReview from "./PlayerReview"
import {fetchUser} from "../../utils/api"
import {Link} from "react-router-dom"
import { useState, useReducer } from "reinspect"

const initialState = {
    players: {
        playerOne: null,
        playerTwo: null
    },
    error: '',
    battle: false
}

function playerReducer(state, action){
    switch(action.type){
        case 'ADD_PLAYER':
            return {
                ...state,
                players: {
                    ...state.players,
                    [action.payload.player]: action.payload.username
                }
            }
        case 'CLEAR_PLAYER':
            return {
                ...state,
                players: {
                    ...state.players,
                    [action.payload.player]: null
                }
            }
        default:
            return state
    }
}

function Player(props){
    const [state, dispatch] = useReducer(playerReducer, initialState, null, 'battle')

    // constructor(props){
    //     super(props)
    //     this.state = {
    //         players: {
    //             playerOne: null,
    //             playerTwo: null
    //         },
    //         error: '',
    //         battle: false
    //     }
    //     this.handlePlayerSubmission = this.handlePlayerSubmission.bind(this)
    //     this.handleUserClearing = this.handleUserClearing.bind(this)
    // }

    const handlePlayerSubmission = (username, player) => {
        // this.setState((state) => ({
        //     players: {
        //         ...state.players,
        //         [player]: username
        //     }
        // }))

        dispatch({type: 'ADD_PLAYER', payload: {player, username}})
    }

    const handleUserClearing = (player) => {
        // this.setState((state) => ({
        //     players: {
        //         ...state.players,
        //         [player]: null
        //     }
        // }), () => {
        //     this.props.clearUserNotFoundError()
        // })

        dispatch({type: 'CLEAR_PLAYER', payload: {player}})
        props.clearUserNotFoundError()
    }

    return (
        <div className="player">
            <h3 className="player__title">Players</h3>
            <div className="player__listing">
                {state.players['playerOne'] ? <PlayerReview clearUser={() => handleUserClearing('playerOne')} username={state.players['playerOne']}/> : <PlayerInput label="Player One" submitPlayer={(username) => handlePlayerSubmission(username, "playerOne")}/>}
                {state.players['playerTwo'] ? <PlayerReview clearUser={() => handleUserClearing('playerTwo')} username={state.players['playerTwo']} /> : <PlayerInput label="Player Two" submitPlayer={(username) => handlePlayerSubmission(username, "playerTwo")} />}
            </div>
            {props.error && <p className="error">{props.error}</p>}
            {state.players.playerOne && state.players.playerTwo && <Link to={`/battle/result?playerOne=${state.players.playerOne}&playerTwo=${state.players.playerTwo}`} className="player__btn btn btn--primary">Battle</Link>}
        </div>
    )
}

Player.propTypes = {
    error: PropTypes.string.isRequired,
    clearUserNotFoundError: PropTypes.func.isRequired
}

export default Player