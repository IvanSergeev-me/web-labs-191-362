import React, {useState, useEffect} from 'react';
import s from './Popup.module.css';
import { Field, reduxForm } from 'redux-form';

let Popup = (props) =>{
    let [isShown,setShow] = useState(props.needShow);
    let [currentData, setData] = useState(props.popupData);
    useEffect(()=>{
        setShow(props.needShow);
        setData(props.popupData);
    },[props.needShow, props.popupData]);
    let closePopup = (e) =>{
        props.closePopup();
        e.preventDefault();
    }
    let isLightTheme = props.isLightTheme;
    let onSubmit = (values) =>{
      // console.log(values);
       props.addCard(values, currentData);
       props.closePopup();
    }
    if(isShown){
        
        return(
            <div className={s.popup_wrapper}>
                <div className={isLightTheme?s.popup:`${s.popup} ${s.d_popup}`}>
                    <div className={s.popup__top}>
                        <button onClick={closePopup}>X</button>
                    </div>
                    <EditCardForm onSubmit={onSubmit} isLightTheme={isLightTheme} currentData={currentData}/>     
                </div>
        </div>
        )
    }
    else return <></>
}
let EditForm = (props) =>{
    let isLightTheme=props.isLightTheme;
    return(
        <form onSubmit={props.handleSubmit} className={s.popup__body}>
                        
        <div className={isLightTheme?s.popup__field:`${s.popup__field} ${s.d_popup__field}`}>
            <label htmlFor="newtext">Описание</label>
            <Field name="newText" component={"input"}  type="text"/>
        </div>
        
        <div className={isLightTheme?s.popup__field:`${s.popup__field} ${s.d_popup__field}`}>
            <label for="status">Статус</label>
            <Field name="selectStatus" component={"select"}>
                <option component={"option"} value="important1">Не важно</option>
                <option component={"option"} value="important2">Стоит сделать</option>
                <option component={"option"} value="important3">Важно</option>
            </Field>
        </div>
        <div className={isLightTheme?s.popup__field:`${s.popup__field} ${s.d_popup__field}`}>
            <button type="submit" >Завершить</button>
        </div>
    </form>
    );
};
const EditCardForm = reduxForm({
    form:"editCardForm"
})(EditForm);
export default Popup;