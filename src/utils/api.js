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
            if(data.message === 'Not Found') throw new Error('Error ' + data.message)
            return data
        })
}


// User fetching
const fetchUserProfile = (username) => {
    const endpoint = window.encodeURI(`https://api.github.com/users/${username}`)

    return fetch(endpoint, {mode: "cors"})
        .then(res => res.json())
        .then(data => {
            if(data.message === 'Not Found') throw new Error('Error ' + data.message)
            return data
        })
}

const getUserData = (username) => {
    return Promise.all([fetchUserProfile(username), fetchUserRepos(username)])
        .then(([profile, repos]) => {
            return {
                ...profile, 
                repos
            }
        })
}

// Battle function
export const initBattle = (players) => {
    const {playerOne, playerTwo} = players;
    return Promise.all([getUserData(playerOne), getUserData(playerTwo)])
        .then(res => {
            return res
        })
}