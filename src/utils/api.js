export const fetchRepos = (lang) => {
    const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${lang}&sort=stars&order=desc&type=Repositories`);

    return fetch(endpoint, {mode: "cors"})
        .then(res => res.json())
        .then(data => {
            if(!data.items) throw new Error('Error fetching ' + data.message)
            return data.items
        })
}