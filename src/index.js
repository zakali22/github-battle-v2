import React from "react"
import ReactDOM from "react-dom"
import "./styles/index.scss"
import App from "./components/App.js"
import { StateInspector } from "reinspect"

ReactDOM.render(
    <StateInspector name="App"> 
        <App />
    </StateInspector>, 
    document.getElementById('root')
)