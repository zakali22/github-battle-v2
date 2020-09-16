import React from "react"
import withHover from "../HOC/withHover"

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

const Tooltip = ({title, hovering, children}) => {
    return (
        <div className="tooltip" style={style.tooltipWrapper}>
            {hovering && <div style={style.tooltip}>{title}</div>}
            {children}
        </div>
    )
}

export default withHover(Tooltip)