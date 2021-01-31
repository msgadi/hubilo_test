import React, {useEffect, useState} from 'react';
import {getAllAlbums} from "../api/services";

function Albums(props) {
    const [albums, setAlbums] = useState([]);
    useEffect(  () => {
        (async ()=> {
            return setAlbums(await getAllAlbums());
        })()
        // return () => {
        //     effect
        // };
    }, []);
    return (
        <div>
            {
                albums && albums.map(album => <p>{album.title}</p>)
            }
        </div>
    );
}

export default Albums;
