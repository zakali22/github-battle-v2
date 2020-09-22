import React from "react"
import Battle from "./Battle/Battle"
import BattleResults from "./Battle/BattleResults"
import Repo from "./RepoComp/Repo"
import Layout from "./Layout/Layout"
import {ThemeProvider} from "../context/ThemeContext"
import {Route, Switch, BrowserRouter as Router} from "react-router-dom"

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
            <Router> {/* Needs to be the highest wrapper element to pass down props (via context) */}
                <ThemeProvider value={this.state}>
                    <Layout>
                        <Switch>
                            <Route exact path="/" component={Repo} />
                            <Route exact path="/battle" component={Battle} />
                            <Route path="/battle/result" component={BattleResults}/>
                        </Switch>
                    </Layout>
                </ThemeProvider>
            </Router>
        )
    }
}

export default App;