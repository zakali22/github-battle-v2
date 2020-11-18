import React from "react"
import PropTypes from "prop-types"
import Tooltip from "../Tooltip/Tooltip"
import {FaUserAlt, FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode} from "react-icons/fa"
import Loading from "../Loading/Loading"
import queryString from "query-string"
import {initBattle} from "../../utils/api"
import {Link} from "react-router-dom"
import { useState, useReducer } from "reinspect"

const initialState = {
    players: null,
    playerData: null,
	loading: false,
	error: null
}

function battleReducer(state, action){
	console.log("Action payload")
	console.log(action.payload)
    switch(action.type){
        case "ADD_PLAYERS":
            return {
                ...state,
                players: {
                    ...state.players,
                    playerOne: action.payload.playerOne,
                    playerTwo: action.payload.playerTwo,
                }
            }
        case "BATTLE_LOADING":
            return {
                ...state,
                loading: action.payload
            }
        case "BATTLE_SUCCESS":
            return {
                ...state,
                loading: false,     
                playerData: {
                    ...state.playerData,
                    playerOne: action.payload.playerOne,
                    playerTwo: action.payload.playerTwo
                }
			}
		case "BATTLE_ERROR":
			return {
				...state,
				error: action.payload
			}
        default: 
            return state
    }
}

function BattleResults(props) {
    const [state, dispatch] = useReducer(battleReducer, initialState, null, 'battle') 
    const {playerOne, playerTwo} = queryString.parse(props.location.search)
    let timer = React.useRef();

    React.useEffect(() => {
		let players = {playerOne, playerTwo}
		dispatch({type: 'ADD_PLAYERS', payload: {playerOne, playerTwo}})
        handleBattle(players)

    }, [])

    const handleBattle = (players) => {
        initBattle(players)
			.then(res => { 
					dispatch({type: 'BATTLE_LOADING', payload: true})
					timer.current = window.setTimeout(() => {
							dispatch({type: 'BATTLE_SUCCESS', payload: {playerOne: res[0], playerTwo: res[1]}})
					}, 1500)

			})
			.catch(error => {
					dispatch({type: 'BATTLE_ERROR', payload: error.message})
					window.clearTimeout(timer.current)
			})
    }


	if(!state.playerData){
		return <Loading text="Loading" />
	}

	return (
		<div className="battle container">
			<div className="battle-result">
				<div className="battle-result__grid">
					{Object.keys(state.playerData).map((player, i) => {
						return (
							<div className="battle-result__player" key={i}>
								<h3>{i === 0 ? 'Winner' : 'Loser'}</h3>
								<img src={`https://github.com/${state.playerData[player].login}.png?size=160`} alt="Player" />
								<p className="battle-result__player-score">Score: {state.playerData[player].score}</p>
								<a href={state.playerData[player].html_url} target="_blank" className="h3 battle-result__player-username">{state.playerData[player].login}</a>
								<div className="battle-result__listing">
									<div className="battle-result__listing-item">
										<FaUserAlt size={22} color="rgb(239, 115, 115)"/>
										<p className="h5">{state.playerData[player].name}</p>
									</div>
									<Tooltip title="User's location">
										{(hovering, style, title) => (
											<>
												{hovering && <div style={style}>{title}</div>}
												<div className="battle-result__listing-item">
													<FaCompass size={22} color="rgb(144, 116, 255)"/>
													<p className="h5">{state.playerData[player].location}</p>
												</div>
											</>
										)}
									</Tooltip>
									<Tooltip title="User's company">
									{(hovering, style, title) => (
											<>
												{hovering && <div style={style}>{title}</div>}
												<div className="battle-result__listing-item">
													<FaBriefcase size={22} color="rgb(121, 85, 72)"/>
													<p className="h5">{state.playerData[player].company}</p>
												</div>
											</>
									)}
									</Tooltip>
									<div className="battle-result__listing-item">
										<FaUsers size={22} color="rgb(129, 195, 245)"/>
										<p className="h5">{state.playerData[player].followers} followers</p>
									</div>
									<div className="battle-result__listing-item">
										<FaUserFriends size={22} color="rgb(64, 183, 95)"/>
										<p className="h5">{state.playerData[player].following} following</p>
									</div>
									<div className="battle-result__listing-item">
										<FaCode size={22} color="rgb(59, 76, 85)"/>
										<p className="h5">{state.playerData[player].public_repos} repositories</p>
									</div>
								</div>
							</div>
						)
					})}
				</div>
				<Link className="btn btn--primary battle-result__button" to={'/battle'}>Reset</Link>
			</div>
		</div>
	)

}

export default BattleResults