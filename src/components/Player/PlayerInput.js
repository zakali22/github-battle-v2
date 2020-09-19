import React from "react"
import PropTypes from "prop-types"
import {ThemeConsumer} from "../../context/ThemeContext"

class PlayerInput extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event){
        event.preventDefault(); // Stop default browser functionality
        this.props.submitPlayer(this.state.username);
    }

    handleInputChange(event){
        this.setState({ // Use this if you're not using the state values themselves
            username: event.target.value
        })
    }

    render(){
        return (
            <ThemeConsumer>
                {({theme}) => (
                    <form className="player__form" onSubmit={this.handleSubmit}>
                        <label className="player__form-label h5" htmlFor="username">{this.props.label}</label>
                        <div className="player__form-row">
                            <input className={`${theme === 'dark' ? theme : ''} player__form-input`} placeholder="github username" id="username" value={this.state.username} onChange={this.handleInputChange}  />
                            <button className={`${!this.state.username ? 'disabled' : ''} player__form-button btn btn--primary ${theme === 'dark' ? theme : ''}`} type="submit" disabled={!this.state.username}>Submit</button>
                        </div>
                    </form>
                )}
            </ThemeConsumer>
        )
    }
}

PlayerInput.propTypes = {
    submitPlayer: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}


export default PlayerInput