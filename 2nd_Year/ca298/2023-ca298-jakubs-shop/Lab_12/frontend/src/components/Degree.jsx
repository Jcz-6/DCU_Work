import { useEffect, useState } from "react";
import {useLocation } from "react-router-dom";

export default function Degree(){
    const location = useLocation();
    const degree = location.state.degree;
    const [cohorts, setCohorts] = useState([]); // cohorsts wish default value

    useEffect(()=>{
        if(cohorts.length===0){
            // if cohorts hasn't already been loaded and set
            fetch(`http://127.0.0.1:8000/api/cohort/?degree=${degree.shortcode}`)
                .then(resp=>resp.json())
                .then(data=>{
                    setCohorts(data)
                })
                .catch((error)=>{
                    console.log(error)
                })
        }
    })
    
    const displayCohorts = () =>{
        return cohorts.map((c)=>
            <li key={c.id}> {c.name} </li>
        )
    }

    return (
        <div>
            <h1>{degree.full_name} - {degree.shortcode}</h1>
            <h3>Cohorts</h3>
            <ul>
                {displayCohorts()}
            </ul>
        </div>
    )
}