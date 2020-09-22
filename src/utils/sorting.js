export const sortRepos = (sort, repos) => {
    if(sort === 'asc'){
        return repos.sort((a, b) => {
            return b.watchers_count - a.watchers_count 
        })
    } else {
        return repos.sort((a, b) => {
            return a.watchers_count - b.watchers_count 
        })
    }
}