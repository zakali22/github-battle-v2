import React from "react"
import PropTypes from "prop-types"

class Loading extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loading: ''
        }
        this.updateLoadingText = this.updateLoadingText.bind(this)
    }

    componentDidMount(){
        this.setState({
            loading: this.props.text
        })
        this.updateLoadingText()
    }

    updateLoadingText(){
        this.textIntervalId = window.setInterval(() => {
            this.state.loading === this.props.text + '...' ? (
                this.setState({
                    loading: this.props.text
                })
            ) : (
                this.setState((state) => ({
                    loading: state.loading + '.'
                }))
            )
        }, 500);
    }

    componentWillUnmount(){
        window.clearInterval(this.textIntervalId)
    }

    render(){
        return (
            <p className="h1" style={{textAlign: 'center'}}>{this.state.loading}</p>
        )
    }
}

Loading.propTypes = {
    text: PropTypes.string.isRequired
}

Loading.defaultProps = {
    text: 'Loading'
}

export default Loading