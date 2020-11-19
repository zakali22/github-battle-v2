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

function Tooltip(props) {
    const [hovering, setHovering] = React.useState(false)

    const mouseOver = () => {
        setHovering(true)
    }

    const mouseLeave = () => {
        setHovering(false)
    }

    return (
        <div className="tooltip" style={style.tooltipWrapper} onMouseOver={mouseOver} onMouseLeave={mouseLeave}>
            {props.children(hovering, style.tooltip, props.title)}
        </div>
    )

}

export default Tooltip