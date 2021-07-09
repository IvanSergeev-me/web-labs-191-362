import React from 'react';
import s from './CardTask.module.css';

const CardTask = (props) =>{
    let appTheme = props.appTheme;
    let isLight = appTheme==="light";
    let deleteTask = (e) =>{
        props.deleteTask(props.id);
        e.preventDefault();
    }
    return(
        <div className={isLight?s.task:`${s.task} ${s.d_task}`}>
            <div className={isLight?s.task__wrapper:`${s.task__wrapper} ${s.d_task__wrapper}`}>
                <h3 className={isLight?s.task__header:`${s.task__header} ${s.d_task__header}`}>Задача №{props.id}</h3>
                <p className={isLight?s.task__description:`${s.task__description} ${s.d_task__description}`}>{props.taskText}</p>
                <div>
                    <h3 className={isLight?s.task__header:`${s.task__header} ${s.d_task__header}`}>Время начала</h3>
                    <p className={isLight?s.task__description:`${s.task__description} ${s.d_task__description}`}>{props.taskCreationDate}</p>
                </div>
            </div>
            <div className={isLight?s.task__buttons:`${s.task__buttons} ${s.d_task__buttons}`}>
                <button onClick={deleteTask} className={isLight?s.task__button:`${s.task__button} ${s.d_task__button}`}>Удалить</button>
            </div>
        </div>
    )

}
export default CardTask;