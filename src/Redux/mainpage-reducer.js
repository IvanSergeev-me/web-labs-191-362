const ADD_TASK = "ADD_TASK";
const DELETE_TASK = "DELETE_TASK";
const SWITCH_THEME = "SWITCH_THEME";

let initialState = {
    cardsInfo:[
       {
           id:0,
           cardType:"inPlan",
           name:"Не важно",
           tasksIn:0,
           tasks:[   
           ]
       },
        {
            id:1,
            cardType:"inProcess",
            name:"Стоит сделать",
            tasksIn:0,
            tasks:[        
            ]
        },
        {
            id:2,
            cardType:"ready",
            name:"Важно",
            tasksIn:0,
            tasks:[      
            ]
        }

    ],
    appTheme: "light"
};
let increment = 0;

const mainpageReducer = (state = initialState, action ) =>{
    switch (action.type){  
        case ADD_TASK:
            let newText = action.values.newText;
            let selectStatus = action.values.selectStatus;
            let idToAdd = 0;
            let date = action.date;
            switch (selectStatus){
                case "important1":{idToAdd=0; break;}
                case "important2":{idToAdd=1; break;}
                case "important3":{idToAdd=2; break;}
                default: idToAdd = 0;
            }
            let taskToAdd = {
                id:increment++,
                taskText:newText,
                taskCreationDate: date,
            }
            let newCardInfo = {
                ...state.cardsInfo[idToAdd], 
                tasks:[ ...state.cardsInfo[idToAdd].tasks, taskToAdd]
            }
            let newCardsInfo = state.cardsInfo.map(
                o => {
                    if (o.id === newCardInfo.id) {
                      return newCardInfo;
                    }
                    return o;
                  }
            )
            console.log(action);
            return {
                ...state,
                cardsInfo: newCardsInfo
            };
        case DELETE_TASK:{
            let idToRemove = action.taskId;
            let cardId = action.cardId;
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
        case SWITCH_THEME:{
            return{
                ...state,
                appTheme:state.appTheme==="light"?state.appTheme="dark":state.appTheme="light"
            }
        }
        default: return state; 
    };
};
const addTask = (values, date) => ({type:ADD_TASK, values, date});
const deleteTask = (cardId, taskId) => ({type:DELETE_TASK, cardId, taskId});
const switchThemeAC = () =>({type:SWITCH_THEME});

export const addTaskThunk = (values, date) =>{
    return(dispatch) =>{
        dispatch(addTask(values, date));
    }
}
export const deleteTaskThunk = (cardId, taskId) =>{
    return(dispatch) =>{
        dispatch(deleteTask(cardId, taskId));
    }
}
export const switchThemeThunk = () =>{
    return(dispatch) =>{
        dispatch(switchThemeAC());       
    }
}
export default  mainpageReducer;