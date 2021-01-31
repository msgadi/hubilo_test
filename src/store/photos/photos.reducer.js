const initialState = []

export default function photosReducer(state = initialState, action) {
    // console.log('state',state)
    switch (action.type) {
        case 'getPhotos': {
            return [...state,...action.payload]
        }
        default:
            return state
    }
}
