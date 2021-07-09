import React, {useState, useEffect} from 'react';
import s from './Popup.module.css';
import { Field, reduxForm } from 'redux-form';
import {requiredField} from '../../Forms/validator.js';
import { Input } from '../../Forms/input.js';

let Popup = (props) =>{
    let [isShown,setShow] = useState(props.needShow);

    useEffect(()=>{
        setShow(props.needShow);
    },[props.needShow]);
   
    let closePopup = (e) =>{
        props.closePopup();
        e.preventDefault();
    }
    let isLightTheme = props.isLightTheme;
    let onSubmit = (values) =>{
       props.addCard(values);
       props.closePopup();
    }

    if(isShown){      
        return(
            <div className={s.popup_wrapper}>
                <div className={isLightTheme?s.popup:`${s.popup} ${s.d_popup}`}>
                    <div className={s.popup__top}>
                        <label htmlFor="close"className={isLightTheme?s.theme__text:`${s.theme__text} ${s.d_theme__text}`}>Закрыть</label>
                        <button name="close" onClick={closePopup}>X</button>
                    </div>
                    <EditCardForm onSubmit={onSubmit} isLightTheme={isLightTheme}/>     
                </div>
            </div>
        )
    }
    else return <></>
}
let EditForm = (props) =>{
    let isLightTheme=props.isLightTheme;
    let [text, setText] = useState("");
    let changeText = (e) =>{
        setText(e.currentTarget.value);
        console.log(needDisable);
    }
    let needDisable = true;
    if (text) needDisable = false;
    return(
        <form onSubmit={props.handleSubmit} className={s.popup__body}>
                        
        <div className={isLightTheme?s.popup__field:`${s.popup__field} ${s.d_popup__field}`}>
            <label htmlFor="newText">Описание</label>
            <Field onChange={changeText} validate={requiredField} name="newText" component={Input}  type="text"/>
        </div>
        
        <div className={isLightTheme?s.popup__field:`${s.popup__field} ${s.d_popup__field}`}>
            <label htmlFor="status">Статус</label>
            <Field validate={requiredField} name="selectStatus" component={"select"}>
                <option component={"option"} value="important1">Не важно</option>
                <option component={"option"} value="important2">Стоит сделать</option>
                <option component={"option"} value="important3">Важно</option>
            </Field>
        </div>
        <div className={isLightTheme?s.popup__field:`${s.popup__field} ${s.d_popup__field}`}>
            <button disabled={needDisable} className={needDisable?s.disabledButton:""} type="submit" >Завершить</button>
        </div>
    </form>
    );
};
const EditCardForm = reduxForm({
    form:"editCardForm"
})(EditForm);
export default Popup;