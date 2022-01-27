import React,{useState} from "react";
import "./App.css";
function DatePick(){
    const [date,setDate]=useState();

    console.log("Date", date);
    return(
        <div className="main">
        <h6>Aloitus päivä : {date} </h6>
        <input type="date" onChange={e=>setDate(e.target.value)} />
        </div>
    );
}
export default DatePick;