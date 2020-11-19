import React, {Suspense, lazy} from "react"
import NavBarList from "./NavBarList"
// import RepoGrid from "../RepoGrid/RepoGrid";
import Loading from "../Loading/Loading"
import { fetchRepos } from "../../utils/api"
import { sortRepos } from "../../utils/sorting"
import { useState, useReducer } from "reinspect"

const RepoGrid = lazy(() => import('../RepoGrid/RepoGrid'))

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

const initialState = {
    currNavSelected: 'All',
    repos: {}, // In order to cache the previously fetched
    error: null,
    isLoading: false,
    sort: 'asc'
}

function repoReducer(state, action){
    switch(action.type){
        case 'FETCH_REPOS_LOADING':
            return {
                ...state, 
                isLoading: action.payload
            }
        case 'FETCH_REPOS_SUCCESS':
            return {
                ...state,
                isLoading: false, 
                repos: {
                    ...state.repos,
                    [action.payload.currNavSelected]: action.payload.data
                }
            }
        case 'FETCH_REPOS_ERROR':
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
        case 'SET_CURRENTNAV':
            return {
                ...state,
                currNavSelected: action.payload,
                isLoading: true,
                sort: 'asc',
                repos: {}
            }
        case 'SET_SORT':
            return {
                ...state,
                sort: action.payload
            }
        case 'SET_SORTED_REPOS':
            return {
                ...state,
                repos: {
                    ...state.repos,
                    [action.payload.currNavSelected]: action.payload.sortedRepoArr
                }
            }
        default: 
            return state;
    }
}

function NavBar() {
    const [state, dispatch] = useReducer(repoReducer, initialState, null, "repos")

    React.useEffect(() => {
        dispatch({type: 'FETCH_REPOS_LOADING', payload: true})
        fetchRepos(state.currNavSelected)
            .then(res => {
                dispatch({type: 'FETCH_REPOS_SUCCESS', payload: {currNavSelected: state.currNavSelected, data: res}})
                sortingRepos(state.sort)
            })
    }, [])

    const handleNavSelectedChange = (currNavSelected) => {
        dispatch({type: 'SET_CURRENTNAV', payload: currNavSelected})

        if(!state.repos[currNavSelected]){ // Only refetch if the language property doesn't exist on the repos object, if it does then don't refetch
            fetchRepos(currNavSelected)
                .then(res => {
                    dispatch({type: 'FETCH_REPOS_SUCCESS', payload: {currNavSelected: currNavSelected, data: res}}) 
                    sortingRepos(state.sort)

                })
                .catch(error => {
                    dispatch({type: 'FETCH_REPOS_ERROR', payload: error})
                }) 
        }
    }

    const handleOptionChange = (e) => {
        dispatch({type: 'SET_SORT', payload: e.target.value})
        sortingRepos(e.target.value)
    }

    const sortingRepos = (sort) => {
        const sortedRepoArr = sortRepos(sort, state.repos[state.currNavSelected])

        dispatch({type: 'SET_SORTED_REPOS', payload: {currNavSelected: state.currNavSelected, sortedRepoArr}})
    }

    return (
        <div className="repo container">
            <NavBarList currNavSelected={state.currNavSelected} handleNavSelectedChange={handleNavSelectedChange} links={POPULAR_LINKS}/>
            {state.isLoading && <Loading text="Fetch repos"/>} {/* if state.isLoading is true then render <p>Loading</p> */}
            {state.repos[state.currNavSelected] && (
                <div className="repo-results">
                    <select style={style.select} onChange={handleOptionChange}>
                        <option value="asc">Asc</option>
                        <option value="desc">Desc</option>
                    </select>
                    <Suspense fallback={<Loading />}>
                        <RepoGrid repos={state.repos[state.currNavSelected]} sort={state.sort}/> 
                    </Suspense>
                </div>
                )
            }
        </div>
    )

}


export default NavBar