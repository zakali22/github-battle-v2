import React from "react"
import {Link} from "react-router-dom"

const style = {
    link: {
        fontSize: "20px",
        fontWeight: "500"
    }
}

const NotFound = () => {
    return (
        <div class="container">
            <Link to="/" style={style.link} class="h5">&#60; Back to home</Link>
            <h1>Ooops. Page not found</h1>
        </div>
    )
}

export default NotFound;