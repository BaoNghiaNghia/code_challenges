import axios from 'axios'
import config from '../config'

const api = {
  get: ({ url, params }) => {
    return axios.get(`${config.API_ENDPOINT}${url}`, params)
      .then((resp) => {
        return  resp ? resp.data : null
      })
  },
  post: ({ url, body }) => {
    return axios.post(`${config.API_ENDPOINT}${url}`, body)
      .then((resp) => {
        return resp.data
      })
  }
}

export default api
