import {toastr} from 'react-redux-toastr'

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_USER_START = 'ADD_USER_START'
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS'
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
export function addUserStart () {
  return {
    type: ADD_USER_START
  }
}

export function addUserSuccess () {
  return {
    type: ADD_USER_SUCCESS
  }
}

export function addUserFailure (errorTarget) {
  return {
    type: ADD_USER_FAILURE,
    errorTarget: errorTarget
  }
}

export const actions = {
  addUserStart,
  addUserSuccess,
  addUserFailure
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_USER_START]: (state, action) => (Object.assign({},state,{isInProgress:true, errorMessage: null})),
  [ADD_USER_SUCCESS]: (state, action) => (Object.assign({},state,{isInProgress:false, errorTarget: null})),
  [ADD_USER_FAILURE]: (state, action) => (Object.assign({},state,{isInProgress:false, errorTarget: state.errorTarget}))
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function userListReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

// ------------------------------------
// Middleware Action Creators
// ------------------------------------

export function doAddUser(id, password, name, email) {
  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(addUserStart(id, password))

    $.ajax({
      method: "post",
      url: 'http://' + location.hostname + ':4000/api/user/add',
      data: {id:id, password: password, name: name, email: email},
      dataType: "json"
    }).done(data => {
        if (data.result === 'success') {
          // Dispatch the success action
          console.log(JSON.stringify(data));
          dispatch(addUserSuccess());
          toastr.success('Succeeded', "A new user added.");
        } else {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(addUserFailure());
          toastr.error('Failed.', 'Sorry, Please check your data and try it again.');
        }
    }).error((err)=> {
      console.log("Error: ", err);
    });
  }
}
