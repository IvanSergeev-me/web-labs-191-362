import React from 'react';
import { useState } from 'react';
import s from './Header.module.css';


const Header = (props) =>{
    let [text, setText] = useState("");
    let addTask = (e) =>{
        props.addTask(text);
        e.preventDefault();
    }
    let onTextChange = (e) =>{
        setText(e.currentTarget.value);
    }
    return(
        <header className={s.header}>
            <div className={s.header__top}>
                <h1>Канбан</h1>
                <div className={s.theme}>
                    <label htmlFor="switch" className={s.theme__text}>Темная тема</label>
                    <input type="checkbox" id="switch" name="theme" />
                 </div>
            </div>
            <div className={s.create__wrapper}>
                <label for="create_new_card" className={s.create__header}>Добавить новую задачу</label>
                <div className={s.create__input_field}>
                    <input onChange={onTextChange}  id="create_new_card" type="text" className={s.create__description}/>
                    <button onClick={addTask} className={s.create__button}>Добавить</button>
                </div>
                
            </div>

        </header>
    );

}
export default Header;