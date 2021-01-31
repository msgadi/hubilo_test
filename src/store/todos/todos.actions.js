import {getTodos} from "../../api/services"

async function todosActionCreators(dispatch, getState) {
    // console.log('getState', getState())
    const response = await getTodos(getState().todos?.length, 10)
    dispatch({type: 'getTodos', payload: response})
}

export default todosActionCreators
