import React from 'react';
import s from './CanbanCard.module.css';
import CardTask from './CardTask/CardTask';

const CanbanCard = (props) =>{
    let id= props.id;
    let cardType=props.cardType;
   
    let tasks=props.tasks;
    let name = props.name;
    let appTheme = props.appTheme;
    //className={props.appTheme==="light"?s.mainPage:`${s.mainPage} ${s.d_mainPage}`
    let deleteTask = (taskId) =>{
        props.deleteTask(id, taskId)
    }
    let tasksList = tasks.map(t=>{
        return(
            <CardTask
                key={t.id}
                id={t.id} 
                taskText={t.taskText}
                taskCreationDate={t.taskCreationDate}
                cardType={cardType}
                deleteTask={deleteTask}
                appTheme={appTheme}
                cardId = {id}
            />
        )
    });
    let tasksIn = tasksList.length;
    return(     
        <div className={appTheme==="light"?s.column:`${s.column} ${s.d_column}`}>
            <h2 className={s.column__header}>{name} ({tasksIn})</h2>
            {tasksList}
        </div>
    );

}
export default CanbanCard;