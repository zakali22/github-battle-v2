import React from "react"

const style = {
    tooltipWrapper: {
        position: 'relative'
    },
    tooltip: {
        backgroundColor: "#2d2d2d",
        padding: "10px",
        width: "150px",
        color: "white",
        position: "absolute",
        left: "-26px",
        top: "-45px",
        fontSize: "1.5rem",
        borderRadius: "7px",
        textAlign: "center",
        opacity: 0.9
    }
}

class Tooltip extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            hovering: false
        }

        this.mouseOver = this.mouseOver.bind(this)
        this.mouseLeave = this.mouseLeave.bind(this)
    }
    componentDidMount(){
        console.log(this.props)
    }
    mouseOver(){
        this.setState({ hovering: true })
    }

    mouseLeave(){
        this.setState({ hovering: false })
    }

    render(){
        return (
            <div className="tooltip" style={style.tooltipWrapper} onMouseOver={this.mouseOver} onMouseLeave={this.mouseLeave}>
                {this.props.children(this.state.hovering, style.tooltip, this.props.title)}
            </div>
        )
    }
}

export default Tooltip