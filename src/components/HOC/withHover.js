import React from "react"

export default function withHover(Component, props) {
    return class WithHover extends React.Component {
        constructor(props){
            super(props)
            this.state = {
                hovering: false
            }

            this.mouseOver = this.mouseOver.bind(this)
            this.mouseLeave = this.mouseLeave.bind(this)
        }
        componentDidMount(){
            console.log(props)
        }
        mouseOver(){
            this.setState({ hovering: true })
        }

        mouseLeave(){
            this.setState({ hovering: false })
        }

        render(){
            const props = {
                hovering: this.state.hovering,
                ...this.props
            }
            return (
                <div onMouseOver={this.mouseOver} onMouseLeave={this.mouseLeave}>
                    <Component {...props} />
                </div>
            )
        }
    }
}