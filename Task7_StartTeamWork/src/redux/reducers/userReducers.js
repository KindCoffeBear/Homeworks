/* eslint-disable default-param-last */

import {
  GET_TOKEN, SIGN_IN, SIGN_OUT, SIGN_UP,
} from '../actionTypes/userType'

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        ...action.payload,
      }
    case SIGN_UP:
      return {
        ...state,
        ...action.payload,
      }
    case GET_TOKEN:
      return {
        ...state,
        ...action.payload,
      }
    case SIGN_OUT:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export default userReducer
