const initialState = {
  data: [
    {id: 512, title: 'react', desc: 'JS library'},
    {id: 236, title: 'redux', desc: 'State Management'}
  ]
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_TODO':
      return {
        ...state
      }
    case 'ADD_TODO':
      return {
        ...state, data: state.data.concat(action.payload)
      }
    case 'UPDATE_TODO':
      return {
        ...state, data: state.data.map((content, i) =>
          content.id === action.payload.id ? {
            ...content, title: action.payload.title, desc: action.payload.desc
          }
            : content)
      }
    case 'REMOVE_TODO':
      return {
        ...state, data: state.data.filter(item => item.id !== action.payload)
      }
    default: return state
  }
}

export default rootReducer