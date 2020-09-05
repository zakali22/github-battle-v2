import React from "react"
import PropTypes from "prop-types"
import {FaUserAlt, FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode} from "react-icons/fa"


const BattleResults = ({players, resetPlayerBattle}) => {
    return (
        <div className="battle-result">
            <div className="battle-result__grid">
                {Object.keys(players).map((player, i) => {
                    return (
                        <div className="battle-result__player" key={i}>
                            <h3>Winner</h3>
                            <img src={`https://github.com/${players[player].login}.png?size=160`} alt="Player" />
                            <p className="battle-result__player-score">Score: 1,300</p>
                            <a href={players[player].html_url} target="_blank" className="h3 battle-result__player-username">{players[player].login}</a>
                            <div className="battle-result__listing">
                                <div className="battle-result__listing-item">
                                    <FaUserAlt size={22} color="rgb(239, 115, 115)"/>
                                    <p className="h5">{players[player].name}</p>
                                </div>
                                <div className="battle-result__listing-item">
                                    <FaCompass size={22} color="rgb(144, 116, 255)"/>
                                    <p className="h5">{players[player].location}</p>
                                </div>
                                <div className="battle-result__listing-item">
                                    <FaBriefcase size={22} color="rgb(121, 85, 72)"/>
                                    <p className="h5">{players[player].company}</p>
                                </div>
                                <div className="battle-result__listing-item">
                                    <FaUsers size={22} color="rgb(129, 195, 245)"/>
                                    <p className="h5">{players[player].followers} followers</p>
                                </div>
                                <div className="battle-result__listing-item">
                                    <FaUserFriends size={22} color="rgb(64, 183, 95)"/>
                                    <p className="h5">{players[player].following} following</p>
                                </div>
                                <div className="battle-result__listing-item">
                                    <FaCode size={22} color="rgb(59, 76, 85)"/>
                                    <p className="h5">{players[player].public_repos} repositories</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <button className="btn btn--primary battle-result__button" onClick={() => resetPlayerBattle()}>Reset</button>
        </div>
    )
}

BattleResults.propTypes = {
    players: PropTypes.object.isRequired,
    resetPlayerBattle: PropTypes.func.isRequired
}

export default BattleResults