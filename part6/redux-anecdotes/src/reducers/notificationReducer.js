const initialState = 'Test Notification'

const asObject = (notif) => {
  return {
    content: notif,
    id: (100000 * Math.random()).toFixed(0)
  }
}


const notifReducer = (state = initialState, action) => { 
  switch (action.type) {
    case 'CREATE_NOTIF':
      // return state.concat(asObject(action.data))
      return state
    case 'REMOVE_NOTIF':
      return state.filter((notif) => notif.id !== action.id)
    default:
      return state
  }
}
    
export const setNotification = (content) => {
  return {
    type: 'CREATE_NOTIF',
    data: content
  }
}

export const removeNotification = (id) => {
  return {
    type: 'CREATE_NOTIF',
    id: id
  }     
}


export default notifReducer