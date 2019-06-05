const config = {
  develop: {
    API_ENDPOINT: process.env.REACT_APP_API_ENDPOINT || 'http://localhost:3009'
  },
  production: {
    API_ENDPOINT: process.env.REACT_APP_API_ENDPOINT || 'http://localhost:3009'
  }
}

export default config[process.env.NODE_ENV || 'develop']
