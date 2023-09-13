import { useState, useEffect } from "react";
function BookList(){
    const [books, setBooks] = useState([])
    const [isLoaded, setIsLoaded] = useState(false);

    const displayBooks = () =>{
        console.log(books)
        return(
            books.map(elem =>
            <div>
                <li>ID: {elem.id}</li>
                <li>{elem.author}</li>
                <li>{elem.title}</li>
                <li>{elem.price}</li>
                <li>{elem.genre}</li>
                <li>{elem.synopsis}</li>
                <br></br>
            </div>
        ))
    }

    useEffect(()=>{
        fetch("http://127.0.0.1:8000/api/book/")
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            setBooks(data) // only use map when extracting a specific bit can make json object and add to it then pass it for multiple things
            setIsLoaded(true);
        })
        .catch(err=>console.log(err))
    })

    if(isLoaded){
        return (
            <ul>
                {displayBooks()}
            </ul>
        )
    }
    else{
        console.log(books)
        return (
            <img src="trollface-troll.gif" />
        )
    }
}

export default BookList;