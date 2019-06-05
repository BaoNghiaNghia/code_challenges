import axios from 'axios'
import config from '../config'

const api = {
  get: ({ url, params }) => {
    axios.get(`${config.API_ENDPOINT}${url}`, params)
      .then((resp) => {
        return resp.json()
      })
  },
  post: ({ url, body }) => {
    axios.post(`${config.API_ENDPOINT}${url}`, body)
      .then((resp) => {
        return resp.json()
      })
  }
}

export default api
