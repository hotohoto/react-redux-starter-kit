// ------------------------------------
// Constants
// ------------------------------------
export const ADD_USER = 'ADD_USER'

// ------------------------------------
// Actions
// ------------------------------------
export function addUser (id, password, name, email) {
  return {
    type: ADD_USER,
    id: id,
    password: password,
    name: name,
    email: email
  }
}

export const actions = {
  addUser
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_USER]: (state, action) => {
    newUserList = [];
    state.userList.forEach((u) => {
      newUserList.push({
        id: u.id,
        password: u.password,
        name: u.name,
        email: u.email
      });
    })
    newUserList.push({
        id: action.id,
        password: action.password,
        name: action.name,
        email: action.email
    });
    return {userList: newUserList};
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {userList:[]} //user list
export default function userListReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
