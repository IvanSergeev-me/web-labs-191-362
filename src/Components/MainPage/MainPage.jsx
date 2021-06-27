import React from 'react';
import s from './MainPage.module.css';
import CanbanCard from './CanbanCard/CanbanCard';
import {connect} from 'react-redux';
import Header from '../Header/Header';
import { addTaskThunk,moveTaskThunk ,deleteTaskThunk } from '../../Redux/mainpage-reducer';

const MainPage = (props) =>{
    let moveTask = (id , cardIdToMove, taskId) =>{
        props.moveTask(id, cardIdToMove, taskId)
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
            />
        )
    });
    
    return(
        <div>
            <Header addTask={props.addTask}/>
            <div className={s.columns}>
               {cardsList}
            </div>
        </div>
    );

}

class CanbanCardClass extends React.Component{
    constructor(props){
        super(props);
    }
    addTask = (text) =>{
        let currentdate = new Date();
        let dateTime = currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/" 
        + currentdate.getFullYear() + " "  
        + currentdate.getHours() + ":"  
        + currentdate.getMinutes() + ":" 
        + currentdate.getSeconds();
        this.props.addTaskThunk(text, currentdate, "ivan");
    }
    moveTask = (id , cardIdToMove, taskId) =>{
        this.props.moveTaskThunk(id , cardIdToMove, taskId);
    }
    render(){
        return(
            <MainPage cardsInfo={this.props.mainPage.cardsInfo} addTask={this.addTask} moveTask={this.moveTask}/>
        );
    }

}
let mapStateToProps = (state) =>({
    mainPage: state.mainPage
})
export default connect(mapStateToProps, {addTaskThunk,moveTaskThunk ,deleteTaskThunk})(CanbanCardClass);