import React from "react"
import NavBarList from "./NavBarList"
import RepoGrid from "../RepoGrid/RepoGrid";
import Loading from "../Loading/Loading"
import { fetchRepos } from "../../utils/api"

const POPULAR_LINKS = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

class NavBar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            currNavSelected: 'All',
            repos: {}, // In order to cache the previously fetched
            error: null,
            isLoading: false
        }
        this.handleNavSelectedChange = this.handleNavSelectedChange.bind(this)
    }

    
    componentDidMount(){
        fetchRepos(this.state.currNavSelected)
        .then(res => {
            this.setState((state) => ({
                repos: {
                    ...state.repos,
                    [this.state.currNavSelected]: res
                }
            }))
        })
    }

    handleNavSelectedChange(currNavSelected) {
        this.setState({
            currNavSelected,
            isLoading: true,
            repos: {}
        })

        if(!this.state.repos[currNavSelected]){ // Only refetch if the language property doesn't exist on the repos object, if it does then don't refetch
            fetchRepos(currNavSelected)
            .then(res => {
                console.log(res)
                this.setState((state) => ({ // If we want to reuse part of the state, or a property within an object on the state, we should return a function (state) => ({})
                    isLoading: false,
                    repos: {
                        ...state.repos,
                        [currNavSelected]: res
                    }
                }))
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    isLoading: false, 
                    error
                })
            }) 
        }
    }

    render(){
        return (
            <div className="repo container">
                <NavBarList currNavSelected={this.state.currNavSelected} handleNavSelectedChange={this.handleNavSelectedChange} links={POPULAR_LINKS}/>
                {this.state.isLoading && <Loading text="Fetch repos"/>} {/* if state.isLoading is true then render <p>Loading</p> */}
                {this.state.repos[this.state.currNavSelected] && <RepoGrid repos={this.state.repos[this.state.currNavSelected]}/> }
            </div>
        )
    }
}


export default NavBar