import React from 'react';
import s from './CardTask.module.css';

const CardTask = (props) =>{
    let appTheme = props.appTheme;
    let isLight = appTheme==="light";
    let moveTask = (e) =>{
        let cardIdToMove = 1;
        if (props.cardType === "inProcess") cardIdToMove = 2;
        props.moveTask(cardIdToMove, props.id);
        e.preventDefault();
    }
    let deleteTask = (e) =>{
        props.deleteTask(props.id);
        e.preventDefault();
    }
    
    return(
        <div className={isLight?s.task:`${s.task} ${s.d_task}`}>
            <div className={isLight?s.task__wrapper:`${s.task__wrapper} ${s.d_task__wrapper}`}>
                <h3 className={isLight?s.task__header:`${s.task__header} ${s.d_task__header}`}>Задача №{props.id}</h3>
                <p className={isLight?s.task__description:`${s.task__description} ${s.d_task__description}`}>{props.taskText}</p>
                {props.cardType!=="inPlan"?<div>
                    <h3 className={isLight?s.task__header:`${s.task__header} ${s.d_task__header}`}>Время начала</h3>
                    <p className={isLight?s.task__description:`${s.task__description} ${s.d_task__description}`}>{props.taskCreationDate}</p>
                    <h3 className={isLight?s.task__header:`${s.task__header} ${s.d_task__header}`}>Ответственный</h3>
                    <p className={isLight?s.task__description:`${s.task__description} ${s.d_task__description}`}>{props.taskExecutor}</p>
                </div>:null}
            </div>
            <div className={isLight?s.task__buttons:`${s.task__buttons} ${s.d_task__buttons}`}>
                <button className={isLight?s.task__button:`${s.task__button} ${s.d_task__button}`}>Редактировать</button>
                {props.cardType==="ready"?<button onClick={deleteTask} className={isLight?s.task__button:`${s.task__button} ${s.d_task__button}`}>Удалить</button>:
                <button onClick={moveTask} className={isLight?s.task__button:`${s.task__button} ${s.d_task__button}`}>Готово</button>}
            </div>
        </div>
    )

}
export default CardTask;