import React from 'react';
import { useState } from 'react';
import s from './Header.module.css';


const Header = (props) =>{
    let [text, setText] = useState("");
    let addTask = (e) =>{
        props.addTask(text);
        e.preventDefault();
    }
    let appTheme = props.appTheme;
    let isLight = appTheme ==="light";
    //className={appTheme==="light"?s.column:`${s.column} ${s.d_column}`
    let onTextChange = (e) =>{
        setText(e.currentTarget.value);
    }
    let changeTheme = (e)=>{
       
       props.switchTheme();
    }
    return(
        <header className={s.header}>
            <div className={s.header__top}>
                <h1>Канбан</h1>
                <div className={s.theme}>
                    <label htmlFor="switch" className={s.theme__text}>Темная тема</label>
                    <input onChange={changeTheme} type="checkbox" id="switch" name="theme" />
                 </div>
            </div>
            <div className={s.create__wrapper}>
                <label for="create_new_card" className={isLight?s.create__header:s.d_create__header}>Добавить новую задачу</label>
                <div className={s.create__input_field}>
                    <input onChange={onTextChange}  id="create_new_card" type="text" className={isLight?s.create__description:`${s.create__description} ${s.d_create__description}`}/>
                    <button onClick={addTask} className={isLight?s.create__button:`${s.create__button} ${s.d_create__button}`}>Добавить</button>
                </div>
                
            </div>

        </header>
    );

}
export default Header;