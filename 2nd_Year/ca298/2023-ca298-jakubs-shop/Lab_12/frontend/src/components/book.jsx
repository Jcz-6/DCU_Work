import { useState, useEffect } from "react";
function Book({id}){
    const [book, setBook] = useState([])
    const [isLoaded, setIsLoaded] = useState(false);



    const displayBook = () =>{
        console.log(book)
        if (book.author == null) {
            return (
                <div>
                <h2>Invalid ID ! Problem ?</h2>
                <img src="trollface-troll.gif" alt="haha" />
                </div>
            )
        }
        return(
            <div>
                <li>{book.author}</li>
                <li>{book.title}</li>
                <li>{book.price}</li>
                <li>{book.genre}</li>
                <li>{book.synopsis}</li>
                <br></br>
            </div>
        )
    }

    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/api/book/${id}/`)
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            setBook(data) // only use map when extracting a specific bit can make json object and add to it then pass it for multiple things
            setIsLoaded(true);
        })
        .catch(err=>console.log(err))
    })

    if(isLoaded){
        return (
            <ul>
                {displayBook()}
            </ul>
        )
    }
    else{
        console.log(book)
        return (
            <img src="trollface-troll.gif" alt="ahha"/>
        )
    }
}

export default Book;