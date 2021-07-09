import React,{useState} from 'react';
import s from './MainPage.module.css';
import CanbanCard from './CanbanCard/CanbanCard';
import {connect} from 'react-redux';
import Header from '../Header/Header';
import { addTaskThunk,deleteTaskThunk, switchThemeThunk } from '../../Redux/mainpage-reducer';
import Footer from './Footer/Footer';
import Popup from '../Popup/Popup.jsx';

const MainPage = (props) =>{
    let deleteTask = (id ,  taskId) =>{
        props.deleteTask(id,  taskId);
    }
    let [needShowPopup, setShow] = useState(false);
    let showEditMode = (e) =>{
      
        setShow(true);
        e.preventDefault();
    }
    let closePopup = () =>{
        setShow(false);
    }
    let isLightTheme = props.appTheme==="light";
    let cardsList = props.cardsInfo.map(c=>{
        return(
            <CanbanCard 
            key={c.id}
            id={c.id}
            cardType={c.cardType}
            tasksIn={c.tasksIn}
            tasks={c.tasks}
            name={c.name}
            deleteTask={deleteTask}
            appTheme={props.appTheme}   
            />
        )
    });
   
    return(
        <div className={isLightTheme?s.mainPage:`${s.mainPage} ${s.d_mainPage}`}>
            <Header appTheme={props.appTheme} addTask={props.addTask} switchTheme={props.switchTheme}/>
            <div className={s.add_wrapper}>
                <button onClick={showEditMode}className={isLightTheme?s.addButton:`${s.addButton} ${s.d_addButton}`}>Добавить задачу</button> 
            </div>
            
            <div className={isLightTheme?s.columns:`${s.columns} ${s.d_columns}`}>
               {cardsList}
            </div>
           <Footer isLightTheme={isLightTheme}/>
           <Popup isLightTheme={props.appTheme==="light"} addCard={props.addCard} needShow={needShowPopup} closePopup={closePopup} />
        </div>
    );

}

class CanbanCardClass extends React.Component{
    constructor(props){
        super(props);
    }
    addTask = (values) =>{
       if(values.newText && values.selectStatus){
            let currentdate = new Date();
            let dateTime = currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + " "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();
            this.props.addTaskThunk(values, dateTime);
        }
        else alert("Заполните описание");
        
    }
    deleteTask = (cardId, taskId) =>{
        this.props.deleteTaskThunk(cardId, taskId)
    }
    switchTheme = () =>{
        this.props.switchThemeThunk();
    }
    render(){
        let appTheme = this.props.mainPage.appTheme;
        return(
            <MainPage addCard={this.addTask} appTheme={appTheme} switchTheme={this.switchTheme}  deleteTask={this.deleteTask} cardsInfo={this.props.mainPage.cardsInfo} />
        );
    }

}
let mapStateToProps = (state) =>({
    mainPage: state.mainPage
})
export default connect(mapStateToProps, {addTaskThunk ,deleteTaskThunk,switchThemeThunk})(CanbanCardClass);
// 