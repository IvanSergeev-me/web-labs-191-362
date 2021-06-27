import React from 'react';
import s from './CanbanCard.module.css';
import CardTask from './CardTask/CardTask';

const CanbanCard = (props) =>{
    let id= props.id
    let cardType=props.cardType
   
    let tasks=props.tasks
    let name = props.name
    let moveTask = (cardIdToMove, taskId) =>{
        props.moveTask(id, cardIdToMove, taskId)
    }
    let tasksList = tasks.map(t=>{
        return(
            <CardTask
            key={t.id}
            id={t.id} 
            taskText={t.taskText}
            taskCreationDate={t.taskCreationDate}
            taskExecutor={t.taskExecutor}
            cardType={cardType}
            moveTask={moveTask}
            />
        )
    });
    let tasksIn = tasksList.length;
    return(     
        <div className={s.column}>
            <h2 className={s.column__header}>{name} ({tasksIn})</h2>
            {tasksList}
        </div>
    );

}
export default CanbanCard;