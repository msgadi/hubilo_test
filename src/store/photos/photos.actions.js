import {getPhotos} from "../../api/services"

async function photosActionCreators(dispatch, getState) {
    // console.log('getState', getState())
    const response = await getPhotos(getState().photos?.length, 12)
    dispatch({type: 'getPhotos', payload: response})
}

export default photosActionCreators
