export const getTodo =()=> {
  return {
    type: 'GET_TODO'
  }
}

export const addTodo =data=> {
  return {
    type: 'ADD_TODO',
    payload: data
  }
}

export const updateTodo =data=> {
  return {
    type: 'UPDATE_TODO',
    payload: data
  }
}

export const removeTodo =id=> {
  return {
    type: 'REMOVE_TODO',
    payload: id
  }
}