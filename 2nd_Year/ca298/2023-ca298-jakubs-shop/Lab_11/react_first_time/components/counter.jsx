import {useState} from "react";

function Counter(){
    const [amount, updateAmount] = useState(0);
    /*const updateAmount =() =>{
        let amount = amount + 1;
        return amount;
    }*/
    function changeAmount(){
        updateAmount(amount + 1);
    }
    
    return(
    <div>
        <p>{amount}</p>
        <button onClick={
            changeAmount
        }>Learn how to count </button>
    </div>
    )
}
export default Counter;
