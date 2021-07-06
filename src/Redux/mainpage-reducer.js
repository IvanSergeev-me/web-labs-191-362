const ADD_TASK = "ADD_TASK";
const DELETE_TASK = "DELETE_TASK";
const MOVE_TASK = "MOVE_TASK";
const EDIT_TASK = "EDIT_TASK";
const SWITCH_THEME = "SWITCH_THEME";
/*
 tasks:[
               {id:0,
                taskText:"-",
                taskCreationDate:"--/--/--",
                taskExecutor:"-"
                },
           ]
*/
let initialState = {
    cardsInfo:[
       {
           id:0,
           cardType:"inPlan",
           name:"План",
           tasksIn:0,
           tasks:[
              
           ]
       },
        {
            id:1,
            cardType:"inProcess",
            name:"В работе",
            tasksIn:0,
            tasks:[
               
            ]
        },
        {
            id:2,
            cardType:"ready",
            name:"Готово",
            tasksIn:0,
            tasks:[
              
            ]
        }

    ],
    appTheme: "light"
};
let increment = 0;
let increment2 = 0;
let increment3 = 0;
const mainpageReducer = (state = initialState, action ) =>{
    switch (action.type){  
        case ADD_TASK:
            return {
                ...state,
                cardsInfo: [
                    state.cardsInfo[0]={
                        ...state.cardsInfo[0], 
                        tasks:[
                            ...state.cardsInfo[0].tasks,
                            {id:increment++, taskText:action.text,  taskCreationDate:action.date, taskExecutor:action.executor}
                        ]
                    },
                    state.cardsInfo[1],
                    state.cardsInfo[2],
                ]
            };
        case DELETE_TASK:{
            let idToRemove = action.taskId;
            let cardId = action.cardId;
           // let nextCard = cardId+1;
            //if (nextCard === state.cardsInfo.length-2){}
            let newTasks = state.cardsInfo[action.cardId].tasks.filter(task=>
                task.id !== idToRemove
            );
            let newCardInfo = {
                ...state.cardsInfo[cardId], 
                tasks:newTasks
            }
            let newCardsInfo = state.cardsInfo.map(
                o => {
                    if (o.id === newCardInfo.id) {
                      return newCardInfo;
                    }
                    return o;
                  }
            )
            
                return{
                    ...state,
                    cardsInfo:newCardsInfo
                }
            
            
        }
        case MOVE_TASK:{
            let currentId = action.id;
            let idToMove = action.idToMove;
            let taskId = action.taskId

            console.log(currentId + "<-cur tomov-> " + idToMove)
            let movedTask = state.cardsInfo[currentId].tasks.filter(task => task.id == taskId);
            let newCardInfo = {
                ...state.cardsInfo[idToMove], 
                tasks:[
                    ...state.cardsInfo[idToMove].tasks,
                    movedTask[0]
                ]
            }
            let newCardsInfo = state.cardsInfo.map(
                o => {
                    if (o.id === newCardInfo.id) {
                      return newCardInfo;
                    }
                    return o;
                  }
            )
                return{
                    ...state,
                    cardsInfo: newCardsInfo
                }
        }
        case SWITCH_THEME:{
            return{
                ...state,
                appTheme:state.appTheme==="light"?state.appTheme="dark":state.appTheme="light"
            }
        }
        case EDIT_TASK:{
            //console.log(action.values);
            //console.log(action.taskData);
            let cardId = action.taskData.cardId;
            let taskId = action.taskData.id;
            let newText = action.values.newText;
            //let selectStatus = values.selectStatus;
            let executor = action.values.executor;
            let taskToEdit = state.cardsInfo[cardId].tasks.filter(task => task.id == taskId)[0];
            if(newText) taskToEdit.taskText = newText;
            if(executor) taskToEdit.taskExecutor = executor;
            let newTasks = state.cardsInfo[cardId].tasks.map(task=>{if (task.id === taskToEdit.id) {return taskToEdit;}return task;});
            //console.log("tte")
            //console.log(taskToEdit)
            //console.log("nwtsks")
            //console.log(newTasks)
            let newCardInfo = {...state.cardsInfo[cardId], tasks:newTasks}
            let newCardsInfo = state.cardsInfo.map(o => {if (o.id === newCardInfo.id) {return newCardInfo;}return o;});
            return{
                ...state,
                cardsInfo: newCardsInfo
            }
        }
        default: return state; 
        //state.cardsInfo[0].tasks=[...state.cardsInfo[0].tasks, {id:0, taskText:"aa",  taskCreationDate:"--/--/--", taskExecutor:"ivan"}]
    };
};
const addTask = (text, date, executor) => ({type:ADD_TASK, text, date, executor});
const editTask = (values, taskData) => ({type:EDIT_TASK, values, taskData});
const deleteTask = (cardId, taskId) => ({type:DELETE_TASK, cardId, taskId});
const moveTask = (id, idToMove, taskId) =>({type:MOVE_TASK,id, idToMove, taskId});
const switchThemeAC = () =>({type:SWITCH_THEME});

export const addTaskThunk = (text, date, executor) =>{
    return(dispatch) =>{
        dispatch(addTask(text, date, executor));
    }
}
export const deleteTaskThunk = (cardId, taskId) =>{
    return(dispatch) =>{
        dispatch(deleteTask(cardId, taskId));
    }
}
export const moveTaskThunk = (id, idToMove, taskId) =>{
    return(dispatch) =>{
        dispatch(moveTask(id, idToMove, taskId));
        dispatch(deleteTask(id, taskId))
    }
}
export const switchThemeThunk = () =>{
    return(dispatch) =>{
        dispatch(switchThemeAC());       
    }
}
export const editTaskThunk = (values, taskData) =>{
    return(dispatch) =>{
        let cardIdToMove;
        let currentCardId = taskData.cardId;
        switch(values.selectStatus){
            case "inPlan":{ cardIdToMove = 0; ; break;}
            case "inProcess":{ cardIdToMove = 1;break;}
            case "ready": {cardIdToMove = 2; break;}
        }
        if(cardIdToMove == undefined || cardIdToMove===currentCardId){
            dispatch(editTask(values, taskData));
        }
        else{
            //console.log("aaa")
            dispatch(editTask(values, taskData));
            dispatch(moveTask(currentCardId, cardIdToMove, taskData.id));
            dispatch(deleteTask(currentCardId, taskData.id));
        }
           
    }
}
export default  mainpageReducer;