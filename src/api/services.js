import axios from 'axios';

const mainApiUrlPart = "https://jsonplaceholder.typicode.com/"

export async function getPhotos(start,limit) {
    const { data } = await axios.get(`${mainApiUrlPart}photos?_start=${start}&_limit=${limit}`)
    return data
}

export async function getAllPosts(){
    const {data} = await axios.get(`${mainApiUrlPart}posts`)
    return data
}

export async function getAllAlbums(){
    const { data }  = await axios.get(`${mainApiUrlPart}albums`)
    return data
}

export async function getAllUsers(){
    const { data } = await axios.get(`${mainApiUrlPart}users`)
    return data
}

export async function getTodos(start,limit){
    const { data } = await axios.get(`${mainApiUrlPart}todos?_start=${start}&_limit=${limit}`)
    return data
}
