export const fetchRepos = (lang) => {
    const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${lang}&sort=stars&order=desc&type=Repositories`);

    return fetch(endpoint, {mode: "cors"})
        .then(res => res.json())
        .then(data => {
            if(!data.items) throw new Error('Error fetching ' + data.message)
            console.log(data.items)
            return data.items
        })
}

const fetchUserRepos = (username) => {
    const endpoint = window.encodeURI(`https://api.github.com/users/${username}/repos`)
    
    return fetch(endpoint, {mode: "cors"})
        .then(res => res.json())
        .then(data => {
            if(data.message) {
                if(data.message === "Not Found") throw new Error(`User ${username}'s repo has not been found`)
                throw new Error('Error ' + error.message)
            } 
            return data
        })
}

// Get repos stars
const getTotalReposStars = (repos) => {
    return repos.reduce((accumulator, repo) => {
        return accumulator + repo.stargazers_count
    }, 0)
}

// Calculate score 
const calculateScore = (followers, repos) => {
    return (followers * 3) + getTotalReposStars(repos)
}


// User fetching
const fetchUserProfile = (username) => {
    const endpoint = window.encodeURI(`https://api.github.com/users/${username}`)

    return fetch(endpoint, {mode: "cors"})
        .then(res => res.json())
        .then(data => {
            if(data.message) {
                if(data.message === "Not Found") throw new Error(`User ${username} has not been found`)
                throw new Error('Error ' + error.message)
            } 
            return data
        })
}

const getUserData = (username) => {
    return Promise.all([fetchUserProfile(username), fetchUserRepos(username)])
        .then(([profile, repos]) => {
            return {
                ...profile, 
                repos,
                score: calculateScore(profile.followers, repos)
            }
        })
}

// Sort players and put winner first
const sortPlayers = players => {
    return players.sort((a, b) => {
        return b.score - a.score // In ascending order
    })
}

// Battle function
export const initBattle = (players) => {
    const {playerOne, playerTwo} = players;
    return Promise.all([getUserData(playerOne), getUserData(playerTwo)])
        .then(res => {
            console.log(res)
            return sortPlayers(res)
        })
}