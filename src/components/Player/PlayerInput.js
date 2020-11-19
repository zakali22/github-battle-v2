import React from "react"
import PropTypes from "prop-types"
import ThemeContext from "../../context/ThemeContext"

function PlayerInput(props){
    const [username, setUsername] = React.useState('')
    const {theme, toggleTheme} = React.useContext(ThemeContext)

    // constructor(props){
    //     super(props);
    //     this.state = {
    //         username: ''
    //     }
    //     this.handleInputChange = this.handleInputChange.bind(this)
    //     this.handleSubmit = this.handleSubmit.bind(this)
    // }

    const handleSubmit = (event) => {
        event.preventDefault(); // Stop default browser functionality
        // this.props.submitPlayer(this.state.username);
        props.submitPlayer(username)
    }

    const handleInputChange = (event) => {
        // this.setState({ // Use this if you're not using the state values themselves
        //     username: event.target.value
        // })

        setUsername(event.target.value)
    }


    return (
        <form className="player__form" onSubmit={handleSubmit}>
            <label className="player__form-label h5" htmlFor="username">{props.label}</label>
            <div className="player__form-row">
                <input className={`${theme === 'dark' ? theme : ''} player__form-input`} placeholder="github username" id="username" value={username} onChange={handleInputChange}  />
                <button className={`${!username ? 'disabled' : ''} player__form-button btn btn--primary ${theme === 'dark' ? theme : ''}`} type="submit" disabled={!username}>Submit</button>
            </div>
        </form>
    )
}

PlayerInput.propTypes = {
    submitPlayer: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}


export default PlayerInput