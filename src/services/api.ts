import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3400'
})

export default api