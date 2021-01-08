const notifReducer = (state = 'Test Notification', action) => { 
    switch (action.type) {
        case 'CREAT_NOTIF':
          return action.data
        default:
          return state
      }
    }
    
    export const setNotification = (content) => {
      return dispatch=>{
        dispatch({
          type: 'SET_NOTIFICATION',
          data: content
        })
          setTimeout(() => {
            dispatch({
              type: 'SET_NOTIFICATION',
              data: null
            })
          }, 5000)
     }
    }
    
    export default notifReducer