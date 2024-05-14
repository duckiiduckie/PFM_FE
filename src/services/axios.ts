import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://localhost:7777/api/',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})