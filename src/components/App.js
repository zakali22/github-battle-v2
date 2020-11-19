import React, {Suspense, lazy} from "react"
// import Battle from "./Battle/Battle"
// import BattleResults from "./Battle/BattleResults"
// import Repo from "./RepoComp/Repo"
import Loading from "./Loading/Loading"
import NotFound from "./NotFound/NotFound"
import Layout from "./Layout/Layout"
import ThemeContext from "../context/ThemeContext"
import useTheme from "./Hooks/useTheme"
import {Route, Switch, BrowserRouter as Router} from "react-router-dom"

const Battle = lazy(() => import('./Battle/Battle'))
const BattleResults = lazy(() => import('./Battle/BattleResults'))
const Repo = lazy(() => import('./RepoComp/Repo'))

function App() {
    const {theme, toggleTheme} = useTheme('light')
    console.log(theme, toggleTheme)
    
    return (
        <Router> {/* Needs to be the highest wrapper element to pass down props (via context) */}
            <ThemeContext.Provider value={{theme, toggleTheme}}>
                <Layout>
                    <Suspense fallback={<Loading />}>
                        <Switch>
                            <Route exact path="/" component={Repo} />
                            <Route exact path="/battle" component={Battle} />
                            <Route path="/battle/result" component={BattleResults}/>
                        </Switch>
                    </Suspense>
                </Layout>
            </ThemeContext.Provider>
        </Router>
    )
    
}

export default App;