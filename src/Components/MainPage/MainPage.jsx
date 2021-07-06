import React,{useState} from 'react';
import s from './MainPage.module.css';
import CanbanCard from './CanbanCard/CanbanCard';
import {connect} from 'react-redux';
import Header from '../Header/Header';
import { addTaskThunk,moveTaskThunk ,deleteTaskThunk, switchThemeThunk,editTaskThunk } from '../../Redux/mainpage-reducer';
import Popup from './Popup/Popup';

const MainPage = (props) =>{
    let moveTask = (id , cardIdToMove, taskId) =>{
        props.moveTask(id, cardIdToMove, taskId);
    }
    let deleteTask = (id ,  taskId) =>{
        props.deleteTask(id,  taskId);
    }
    let [needShowPopup, setShow] = useState(false);
    let [popupData, setPopupData] = useState({id:null, taskText:"", status:"",taskExecutor:"", taskCreationDate:"", cardId:null})
    let showEditMode = (taskData) =>{
        setPopupData(taskData);
        setShow(true);
    }
    let closePopup = () =>{
        setShow(false);
    }
    let cardsList = props.cardsInfo.map(c=>{
        return(
            <CanbanCard 
            key={c.id}
            id={c.id}
            cardType={c.cardType}
            tasksIn={c.tasksIn}
            tasks={c.tasks}
            name={c.name}
            moveTask={moveTask}
            deleteTask={deleteTask}
            appTheme={props.appTheme}
            showEditMode={showEditMode}     
            />
        )
    });
   
    return(
        <div className={props.appTheme==="light"?s.mainPage:`${s.mainPage} ${s.d_mainPage}`}>
            <Header appTheme={props.appTheme} addTask={props.addTask} switchTheme={props.switchTheme}/>
            <div className={props.appTheme==="light"?s.columns:`${s.columns} ${s.d_columns}`}>
               {cardsList}
            </div>
            <Popup isLightTheme={props.appTheme==="light"} editCard={props.editCard} needShow={needShowPopup} closePopup={closePopup} popupData={popupData}/>
        </div>
    );

}

class CanbanCardClass extends React.Component{
    constructor(props){
        super(props);
    }
    addTask = (text) =>{
        if(text){
            let currentdate = new Date();
            let dateTime = currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + " "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();
            this.props.addTaskThunk(text, dateTime, "ivan");
        }
        else alert("Заполните описание");
        
    }
    moveTask = (id , cardIdToMove, taskId) =>{
        this.props.moveTaskThunk(id , cardIdToMove, taskId);
    }
    deleteTask = (cardId, taskId) =>{
        this.props.deleteTaskThunk(cardId, taskId)
    }
    switchTheme = () =>{
        this.props.switchThemeThunk();
    }
    editTask = (values, taskData) =>{
        this.props.editTaskThunk(values, taskData);
    }
    render(){
        let appTheme = this.props.mainPage.appTheme;
        return(
            <MainPage editCard={this.editTask} appTheme={appTheme} switchTheme={this.switchTheme}  deleteTask={this.deleteTask} cardsInfo={this.props.mainPage.cardsInfo} addTask={this.addTask} moveTask={this.moveTask}/>
        );
    }

}
let mapStateToProps = (state) =>({
    mainPage: state.mainPage
})
export default connect(mapStateToProps, {addTaskThunk,moveTaskThunk ,deleteTaskThunk,switchThemeThunk,editTaskThunk})(CanbanCardClass);