import React from "react"
import NavBarList from "./NavBarList"
import RepoGrid from "../RepoGrid/RepoGrid";
import Loading from "../Loading/Loading"
import { fetchRepos } from "../../utils/api"
import { sortRepos } from "../../utils/sorting"

const POPULAR_LINKS = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

const style = {
    select: {
        width: "150px",
        fontSize: "1.8rem",
        border: "3px solid #bb2e25",
        borderRadius: "10px",
        padding: "5px 9px",
    }, 
    option: {
        borderRadius: "10px"
    }
}

class NavBar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            currNavSelected: 'All',
            repos: {}, // In order to cache the previously fetched
            error: null,
            isLoading: false,
            sort: 'asc'
        }
        this.handleNavSelectedChange = this.handleNavSelectedChange.bind(this)
        this.handleOptionChange = this.handleOptionChange.bind(this)
        this.sortRepos = this.sortRepos.bind(this)
    }

    
    componentDidMount(){
        this.setState({
            isLoading: true
        })
        fetchRepos(this.state.currNavSelected)
        .then(res => {
            this.setState((state) => ({
                repos: {
                    ...state.repos,
                    [this.state.currNavSelected]: res
                }, 
                isLoading: false
            }), () => {
                this.sortRepos(this.state.sort)
            })
        })
    }

    handleNavSelectedChange(currNavSelected) {
        this.setState({
            currNavSelected,
            isLoading: true,
            repos: {}, 
            sort: 'asc'
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
                }), () => {
                    this.sortRepos(this.state.sort)
                })
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

    handleOptionChange(e){
        this.setState({
            sort: e.target.value
        }, () => {
            this.sortRepos(this.state.sort)
        })
    }

    sortRepos(sort){
        const sortedRepoArr = sortRepos(sort, this.state.repos[this.state.currNavSelected])
        this.setState((state) => ({
            repos: {
                ...state.repos,
                [state.currNavSelected]: sortedRepoArr
            }
        }))
    }

    render(){
        return (
            <div className="repo container">
                <NavBarList currNavSelected={this.state.currNavSelected} handleNavSelectedChange={this.handleNavSelectedChange} links={POPULAR_LINKS}/>
                {this.state.isLoading && <Loading text="Fetch repos"/>} {/* if state.isLoading is true then render <p>Loading</p> */}
                {this.state.repos[this.state.currNavSelected] && (
                    <div className="repo-results">
                        <select style={style.select} onChange={this.handleOptionChange}>
                            <option value="asc">Asc</option>
                            <option value="desc">Desc</option>
                        </select>
                        <RepoGrid repos={this.state.repos[this.state.currNavSelected]} sort={this.state.sort}/> 
                    </div>
                    )
                }
            </div>
        )
    }
}


export default NavBar