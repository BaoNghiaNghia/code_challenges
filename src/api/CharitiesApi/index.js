import api from '../ApiFactory'

const getCharities = async () => {
  const charities = await api.get({ url: '/charities' })
  return charities
}

export {
  getCharities
}
