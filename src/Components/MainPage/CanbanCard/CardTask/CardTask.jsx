import React from 'react';
import s from './CardTask.module.css';

const CardTask = (props) =>{
    let moveTask = (e) =>{
        let cardIdToMove = 1;
        if (props.cardType === 1) cardIdToMove = 2;
        props.moveTask(cardIdToMove, props.id);
        e.preventDefault();
    }
    return(
        <div className={s.task}>
            <div className={s.task__wrapper}>
                <h3 className={s.task__header}>Задача №{props.id}</h3>
                <p className={s.task__description}>{props.taskText}</p>
            </div>
            <div className={s.task__buttons}>
                <button className={s.task__button}>Редактировать</button>
                {props.cardType==="ready"?<button className={s.task__button}>Удалить</button>:<button onClick={moveTask} className={s.task__button}>Готово</button>}
            </div>
        </div>
    )

}
export default CardTask;