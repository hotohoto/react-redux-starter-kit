import { push } from 'react-router-redux'
import {toastr} from 'react-redux-toastr'

// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_START = 'LOGIN_START'
export const LOGIN_PROCESS = 'LOGIN_PROCESS'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT = 'LOGOUT'

// ------------------------------------
// Actions creators (and the actions defined within them)
// ------------------------------------
export function loginStart (id, password) {
  return {
    type: LOGIN_START,
    id: id,
    password: password
  }
}

export function loginSuccess (userKey) {
  return {
    type: LOGIN_SUCCESS,
    userKey: userKey
  }
}

export function loginFailure () {
  return {
    type: LOGIN_FAILURE
  }
}

export function logout() {
  return {
    type: LOGOUT
  }
}

export const actions = {
  loginStart,
  loginSuccess,
  loginFailure,
  logout
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN_START]: (state, action) => (Object.assign({},state,{isInProgress:true, errorMessage: null})),
  [LOGIN_SUCCESS]: (state, action) => (Object.assign({},state,{isInProgress:false, userKey:action.userKey})),
  [LOGIN_FAILURE]: (state, action) => (Object.assign({},state,{isInProgress:false, errorMessage:"Your id or password does NOT match."})),
  [LOGOUT]: (state, action) => (Object.assign({},state,{userKey:null}))
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function loginReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

// ------------------------------------
// Middleware Action Creators
// ------------------------------------

export function loginUser(id, password) {
  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(loginStart(id, password))

    $.ajax({
      method: "post",
      url: 'http://' + location.hostname + ':4000/api/login',
      data: {id:id, password: password},
      dataType: "json"
    }).done(data => {
        if (data.result === 'success') {
          // Dispatch the success action
          console.log(JSON.stringify(data));
          dispatch(loginSuccess(data.userKey));
          toastr.success('Welcome.', "You're successfully logged in.");
          dispatch(push('/'));
        } else {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginFailure());
          toastr.error('Login failed.', 'Your id or password does not match. Please, try it again.');
        }
    }).error((err)=> {
      console.log("Error: ", err);
    });
  }
}