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


const fetchUser = (username) => {
    const endpoint = window.encodeURI(`https://api.github.com/users/${username}`)

    return fetch(endpoint, {mode: "cors"})
        .then(res => res.json())
        .then(data => {
            if(data.message === 'Not Found') throw new Error('Error ' + data.message)
            return data
        })
}