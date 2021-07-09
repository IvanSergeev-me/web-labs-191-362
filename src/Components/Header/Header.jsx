import React from 'react';
import s from './Header.module.css';
import logo from './logo.webp';

const Header = (props) =>{
    let appTheme = props.appTheme;
    let isLight = appTheme ==="light";
    //className={appTheme==="light"?s.column:`${s.column} ${s.d_column}`
    let changeTheme = (e)=>{
       
       props.switchTheme();
    }
    return(
        <header className={s.header}>
            <div className={s.header__top}>
                <div className={s.top__logo_name}>
                    <div className={s.top__logo_container}>
                        <img 
                            className={s.top__logo_img} src={logo} 
                            alt="logo" />
                    </div>
                    <span className={s.top__name}>SERGEEV</span>
                </div>
                <div className={s.top__theme}>
                    <label htmlFor="switch" className={s.theme__text}>Темная тема</label>
                    <input onChange={changeTheme} type="checkbox" id="switch" name="theme" />
                 </div>
            </div>

        </header>
    );

}
export default Header;