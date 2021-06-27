const ADD_TASK = "ADD_TASK";
const DELETE_TASK = "DELETE_TASK";
const MOVE_TASK = "MOVE_TASK";
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

    ]
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
            if(cardId==1){
                return{
                    ...state,
                    cardsInfo:[
                        state.cardsInfo[cardId]=newCardInfo,
                        state.cardsInfo[1],
                        state.cardsInfo[2],
                    ]
                }
            }
            else if(cardId==2){return{...state,cardsInfo:[state.cardsInfo[0],state.cardsInfo[cardId]=newCardInfo,state.cardsInfo[2],]}}
            else if(cardId==3){return{...state,cardsInfo:[state.cardsInfo[0],state.cardsInfo[1],state.cardsInfo[cardId]=newCardInfo,]}}
            else return{
                ...state,
                cardsInfo:[
                    state.cardsInfo[cardId]=newCardInfo,
                    state.cardsInfo[1],
                    state.cardsInfo[2],
                ]
            }
        }
        case MOVE_TASK:{
            let currentId = action.id;
            let idToMove = action.idToMove;
            let taskId = action.taskId

            console.log(currentId)
            let movedTask = state.cardsInfo[currentId].tasks.filter(task => task.id == taskId);
            let newCardInfo = {
                ...state.cardsInfo[idToMove], 
                tasks:[
                    ...state.cardsInfo[idToMove].tasks,
                    movedTask[0]
                ]
            }
            console.log(movedTask)
            if(idToMove == 1){
                return{
                
                    ...state,
                    cardsInfo: [
                        state.cardsInfo[0],
                        state.cardsInfo[idToMove]= newCardInfo,
                        state.cardsInfo[2],
                    ]
                }
            }
            else if(idToMove == 2){return{...state,cardsInfo: [state.cardsInfo[0],state.cardsInfo[1],state.cardsInfo[idToMove]= newCardInfo,]}}
            else return {...state,cardsInfo: [state.cardsInfo[0],state.cardsInfo[idToMove]= newCardInfo,state.cardsInfo[2],]}
            
        }
        default: return state; 
        //state.cardsInfo[0].tasks=[...state.cardsInfo[0].tasks, {id:0, taskText:"aa",  taskCreationDate:"--/--/--", taskExecutor:"ivan"}]
    };
};
const addTask = (text, date, executor) => ({type:ADD_TASK, text, date, executor});
const deleteTask = (cardId, taskId) => ({type:DELETE_TASK, cardId, taskId});
const moveTask = (id, idToMove, taskId) =>({type:MOVE_TASK,id, idToMove, taskId})

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
export default  mainpageReducer;