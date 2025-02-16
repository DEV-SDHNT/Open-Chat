import React from "react";

const ReminderList=({reminders,deleteReminder})=>{
    return (
        <ul>
            {reminders.map((reminder)=>(
                <li key={reminder.id}>
                    &nbsp;{reminder.text}
                    <button onClick={()=>deleteReminder(reminder.id)}>
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default ReminderList;