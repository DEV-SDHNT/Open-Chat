import React, { useState } from "react";

const ReminderForm=({addReminder})=>{
    const [input,setInput]=useState("");

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(input.trim()){
            addReminder(input);
            setInput("");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Add a Task !!!"
                value={input}
                onChange={(e)=>setInput(e.target.value)}></input>
                <button 
                    type="submit">+</button>
        </form>
    );
};

export default ReminderForm;