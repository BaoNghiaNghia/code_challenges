const config = {
  develop: {
    API_ENDPOINT: process.env.REACT_APP_API_ENDPOINT || 'https://localhost:3001'
  },
  production: {
    API_ENDPOINT: process.env.REACT_APP_API_ENDPOINT || 'https://localhost:3001'
  }
}

export default config[process.env.NODE_ENV || 'develop']
