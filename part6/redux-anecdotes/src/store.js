import {createStore, combineReducers} from 'redux'

import anecdoteReducer from './reducers/anecdoteReducer'
import notifReducer from './reducers/notificationReducer'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notifReducer
})

const store = createStore(reducer)
export default store