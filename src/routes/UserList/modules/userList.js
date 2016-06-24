import { push } from 'react-router-redux'
import {toastr} from 'react-redux-toastr'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_USER_LIST_SUCCESS = 'GET_USER_LIST_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
export function getUserListSuccess (userList) {
  return {
    type: GET_USER_LIST_SUCCESS,
    userList
  }
}

export const actions = {
  getUserListSuccess,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_USER_LIST_SUCCESS]: (state, action) => (Object.assign({},state,{userList:action.userList}))
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
export function doGetUserList() {
  return dispatch => {
    const userKey = localStorage.getItem('userKey');
    if (userKey) {
      $.ajax({
        method: "post",
        url: 'http://' + location.hostname + ':4000/api/user',
        data: {userKey:userKey},
        dataType: "json"
      }).done(data => {
        // Dispatch the success action
        dispatch(getUserListSuccess(data));
      }).error((err)=> {
        console.log("Error: ", err);
      });
    } else {
      dispatch(push('/login'));
    }
  }
}

export function doSetUserPassword(id, password) {
  return dispatch => {
    const userKey = localStorage.getItem('userKey');
    $.ajax({
      method: "post",
      url: 'http://' + location.hostname + ':4000/api/user/setPassword',
      data: {userKey:userKey, id: id, password: password},
      dataType: "json"
    }).done(data => {
      if (data.result === "success") {
        toastr.success('Succeeded.', "The password has been changed successfully.");
      } else {
        toastr.error('Failed.', "The password has not been changed.");
      }
        
    }).error((err)=> {
      console.log("Error: ", err);
    });
  }
}