import { AUTH_SUCCESS, AUTH_LOGOUT } from '../actions/actionTypes'

const initialState = {
    token: null
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                token: action.token
            }
        case AUTH_LOGOUT:
            return {
                token: null            
            }
        default: 
            return state
    }
}