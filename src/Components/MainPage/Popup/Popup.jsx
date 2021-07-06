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
       props.editCard(values, currentData);
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
    let currentData=props.currentData;
    return(
        <form onSubmit={props.handleSubmit} className={s.popup__body}>
                        
        <div className={isLightTheme?s.popup__field:`${s.popup__field} ${s.d_popup__field}`}>
            <label htmlFor="newtext">Описание</label>
            <Field name="newText" component={"input"}  value={currentData.taskText}  type="text"/>
        </div>
        
        <div className={isLightTheme?s.popup__field:`${s.popup__field} ${s.d_popup__field}`}>
            <label for="status">Статус</label>
            <Field name="selectStatus" component={"select"}  value={currentData.status}>
                <option component={"option"} value="inPlan">Запланированно</option>
                <option component={"option"} value="inProcess">В работе</option>
                <option component={"option"} value="ready">Готово</option>
            </Field>
        </div>
        
        <div className={isLightTheme?s.popup__field:`${s.popup__field} ${s.d_popup__field}`}>
            <label for="executor">Ответственный</label>
            <Field component={"input"}  value={currentData.taskExecutor} name="executor" type="text"/>
        </div>
        
        <div className={isLightTheme?s.popup__field:`${s.popup__field} ${s.d_popup__field}`}>
            <label for="start_date">Дата и время начала</label>
            <Field component={"input"} name="start_date" type="datetime-local"/> 
        </div>

        <div className={isLightTheme?s.popup__field:`${s.popup__field} ${s.d_popup__field}`}>
            <label for="end_date">Дата и время завершения</label>
            <Field component={"input"} name="end_date" type="datetime-local" /> 
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