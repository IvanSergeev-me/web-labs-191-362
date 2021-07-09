import React from 'react';
import s from './Footer.module.css';

const Footer = (props) =>{
    let isLight = props.isLightTheme;
    return(
        <div className={isLight?s.footer:`${s.footer} ${s.d_footer}`}>
            <p className={isLight?s.footer__fio:`${s.footer__fio} ${s.d_footer__fio}`}>Сергеев Иван Николаевич</p>
            <p className={isLight?s.footer__group:`${s.footer__group} ${s.d_footer__group}`}>191-362</p>
            <p className={s.footer__date}>09.07.2001</p>
        </div>
    );
}
export default Footer;
