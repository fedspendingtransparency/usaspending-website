import { combineReducers } from 'redux';

export default (state, action) => {
  switch(action.type) {
    case 'addTodo':
      return state.push(action.todo)
    default:
      return state
  }
}





// const appReducer = combineReducers({
//
// });
//
// export default appReducer;
