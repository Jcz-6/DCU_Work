import { useState } from "react";
import Book from "./book";

function Input() {
      const [message, setMessage] = useState('');
    
      //const [updated, setUpdated] = useState(message);
    
      const handleChange = (event) => {
        setMessage(event.target.value);
      };
    
      /*const handleClick = () => {
        // 👇 "message" stores input field value
        <button onClick={handleClick}>Update</button>
        setUpdated(message);
      };*/
    
      return (
        <div>
            <p>Input a book ID</p>
            <br></br>
          <input
            type="text"
            id="message"
            name="message"
            onChange={handleChange}
            value={message}
          />
            <br></br>
          <Book id={message}/>
        </div>
      );
    }
export default Input;