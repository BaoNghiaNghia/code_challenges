import api from '../ApiFactory'

const getPayments = async () => {
  const payments = await api.get({ url: '/payments' })
  return payments
}

const payment = async ({ id, amount, curency }) => {
  const payments = await api.post({ url: '/payments', body: { charitiesId: id, amount, curency } })
  return payments
}

export {
  getPayments,
  payment
}
