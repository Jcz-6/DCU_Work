import React, {useEffect} from "react";
import { io } from 'socket.io-client'
import axios from 'axios'

//const socket = io.connect("http://localhost:5000");



const Socket = () => {

    useEffect(() => {
        /*socket.on('connect', function(data){
            console.log('it works')
        })*/

    }, []);

    return (
        <h1>socket test</h1>
    )
}


export default Socket;