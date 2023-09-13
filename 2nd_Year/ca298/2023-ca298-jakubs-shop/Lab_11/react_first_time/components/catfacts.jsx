import { useState, useEffect } from "react";
function CatFacts(){
    const [facts, setFacts] = useState(["cats are cool", "cats are not nice"])
    const [isLoaded, setIsLoaded] = useState(false);

    const displayFacts = () =>{
        return(
            facts.map(elem =>
                <li>{elem}</li>)
        )
    }

    useEffect(()=>{
        fetch("https://cat-fact.herokuapp.com/facts")
        .then(response=>response.json())
        .then(data=>{
            setFacts(data.map(e=>e.text))
            setIsLoaded(true);
        })
        .catch(err=>console.log(err))
    })

    if(isLoaded){
        return (
            <ul>
                {displayFacts()}
            </ul>
        )
    }
    else{
        return (
            <img src="trollface-troll.gif" />
        )
    }
}

export default CatFacts;