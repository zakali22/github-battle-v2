import React, {Suspense, lazy} from "react"
// import Battle from "./Battle/Battle"
// import BattleResults from "./Battle/BattleResults"
// import Repo from "./RepoComp/Repo"
import Loading from "./Loading/Loading"
import React from "react"
import Battle from "./Battle/Battle"
import BattleResults from "./Battle/BattleResults"
import Repo from "./RepoComp/Repo"
import NotFound from "./NotFound/NotFound"
import Layout from "./Layout/Layout"
import {ThemeProvider} from "../context/ThemeContext"
import {Route, Switch, BrowserRouter as Router} from "react-router-dom"

const Battle = lazy(() => import('./Battle/Battle'))
const BattleResults = lazy(() => import('./Battle/BattleResults'))
const Repo = lazy(() => import('./RepoComp/Repo'))

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
                        <Suspense fallback={<Loading />}>
                            <Switch>
                                <Route exact path="/" component={Repo} />
                                <Route exact path="/battle" component={Battle} />
                                <Route path="/battle/result" component={BattleResults}/>
                            </Switch>
                        </Suspense>
                    </Layout>
                </ThemeProvider>
            </Router>
        )
    }
}

export default App;