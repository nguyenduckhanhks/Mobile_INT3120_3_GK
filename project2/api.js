export const fetchData = async (search, page) => {
    const response = await fetch(`http://www.omdbapi.com/?apikey=d0afcd37&s=${search}&page=${page}`)
    if (!response.ok) throw new Error('There was a problem fetching your request')
    const { Search } = await response.json()
    return Search
}

export const getMovie = async (id) => {
    const response = await fetch(`http://www.omdbapi.com/?apikey=d0afcd37&i=${id}`)
    if (!response.ok) throw new Error('There was a problem fetching your request')
    const movie = await response.json()
    return movie
}