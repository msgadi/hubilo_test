import { applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'
import photosReducer  from "./photos/photos.reducer"
import todosReducer  from "./todos/todos.reducer"
import { connectRouter, routerMiddleware } from "connected-react-router";
// import rootReducer from './reducer'


export const reducers = {
    photos: photosReducer,
    todos: todosReducer,
};
const middlewares = [thunk];
//, routerMiddleware(history)

const rootReducer = combineReducers({
    ...reducers,
    // router: connectRouter(history),
});

const enhancers = [];
const windowIfDefined =
    typeof window === "undefined" ? null : (window);
if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
}

// const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const initialState = {
    photos:[],
    todos:[]
}

const store = createStore(rootReducer,initialState,
    compose(applyMiddleware(...middlewares), ...enhancers)
    );
export default store;
