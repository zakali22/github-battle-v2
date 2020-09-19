import React from "react"
import NavBar from "./RepoNavBar/NavBar.js"
import Battle from "./Battle/Battle"
import Layout from "./Layout/Layout"
import {ThemeProvider} from "../context/ThemeContext"

class App extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            theme: 'light',
            toggleTheme: () => {
                this.setState(({theme}) => ({
                    theme: theme === 'light' ? 'dark' : 'light'
                }))
            }
        }
    }
    render(){
        return (
            <ThemeProvider value={this.state}>
                <Layout>
                    <div className="battle container">  
                        <Battle />
                    </div>
                </Layout>
            </ThemeProvider>

        )
    }
}

export default App;