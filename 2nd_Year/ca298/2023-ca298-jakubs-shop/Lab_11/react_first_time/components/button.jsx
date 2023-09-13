import {useState} from "react";

function MyButton(){
return(
<button onClick={
	()=>{
			alert("Hi")
		}
}>Click me </button>)
}
export default MyButton;

/*import { useState } from "react";

function SomeComponent(){
	const [myVar, setMyVar] = useState(0);
	const [stringVar, setStringVar] = useState("Hi"); // string
	const [objVar, setObjVar] = useState({'type':'initial'}) // json object
	const [arrVar, setArrVar] = useState([1,2,3]); // array

// the rest of the component
} */