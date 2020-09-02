import React from "react"
import Player from "./Player"
import PropTypes from "prop-types"

const PlayerReview = ({username, clearUser}) => {
    return (
        <div className="player__preview">
            <img className="player__preview-image" src={`https://github.com/${username}.png?size=200`} />
            <a href={`https://github.com/${username}`} className="player__preview-name"><p className="h5">{username}</p></a>
            <button onClick={clearUser} className="player__preview-button">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" color="rgb(194, 57, 42)" size="26" height="26" width="26"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path></svg>
            </button>
        </div>
    )
}

PlayerReview.propTypes = {
    username: PropTypes.string.isRequired,
    clearUser: PropTypes.func.isRequired
}

export default PlayerReview