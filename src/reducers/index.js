import { createStore } from 'redux'
import { UPDATE_MESSAGE, UPDATE_TOTAL_DONATE } from './constants'

const store = createStore((state, action) => {
  const _state = state == null ? {
    donate: 0,
    message: ''
  } : state

  switch (action.type) {
    case UPDATE_TOTAL_DONATE:
      return { 
        ..._state,
        donate: _state.donate + action.payload 
      }
      
    case UPDATE_MESSAGE:
      return { 
        ..._state,
        message: action.message
      }

    default: return _state
  }
})

export default store
