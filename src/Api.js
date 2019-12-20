import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/',

})

const apis = {
    loadGenres: () => api.get('genres'),
    newSeries: (newSerie) => api.post('series', newSerie),
    loadSeriesByGenre: (genre) => api.get(`series?genre=${genre}`),
    deleteSeries: (id) => api.delete(`series/${id}`),
    loadSeriesById: (id) => api.get(`series/${id}`),
    editSeries: (serie) => api.put(`series/${serie.id}`, serie)
}

export default apis
