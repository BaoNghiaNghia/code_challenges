import { UPDATE_TOTAL_DONATE, UPDATE_MESSAGE } from './constants'

const updateDonate = (payload) => ({
  type: UPDATE_TOTAL_DONATE,
  payload
})

const updateMessage = (payload) => ({
  type: UPDATE_MESSAGE,
  payload
})

export {
  updateDonate,
  updateMessage
}
