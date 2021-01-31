import React, {useEffect, useState} from 'react';
import {getAllUsers} from "../api/services";

function Users(props) {
    const [users, setUsers] = useState([]);
    useEffect(  () => {
        (async ()=> {
            return setUsers(await getAllUsers());
        })()
        // return () => {
        //     effect
        // };
    }, []);
    return (
        <div>
            {
                users && users.map(album => <p>{album.name}</p>)
            }
        </div>
    );
}

export default Users;
