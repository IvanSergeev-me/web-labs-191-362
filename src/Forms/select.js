import React from 'react';
import s from './select.module.css';
export const Select = ({select, meta,...props}) =>{
    const hasError = meta.touched && meta.error;
    
    return(
        
        <div className={s.container}>
             {hasError&&<span className={s.error_message}>{meta.error}</span>}
            <select className={s.login_form__input + " " + (hasError?s.login_form__input_error:"")} {...select} {...props}/>
        </div>
        
    )
}