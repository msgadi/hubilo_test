const initialState = []

export default function todosReducer(state = initialState, action) {
    // console.log('state',state)
    switch (action.type) {
        case 'getTodos': {
            if (action.payload){
                return [...state,...action.payload]    
            }else {
                return state
            }
            
        }
        default:
            return state
    }
}
