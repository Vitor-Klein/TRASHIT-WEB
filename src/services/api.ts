import axios from 'axios'

const api = axios.create({
    baseURL: 'https://trash-it.onrender.com/'
})

export default api