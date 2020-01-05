import * as actionTypes from '../store/actionTypes'
import { act } from 'react-dom/test-utils';


const initialState = {
    showLoanComponent: false,
    loans:[],
    inspectLoan:0
  
}

const reducer = (state = initialState ,action) => {
    switch(action.type){
        case actionTypes.TOGGLE_LOAN_DIV:
        {
            return {
               ...state,
               showLoanComponent: !state.showLoanComponent
               
            }
        }
        case actionTypes.INSERT_NEW_LOAN:
            {
                let  theLoan = {...action.value};
                let newLoans = [...state.loans];
                newLoans.push(theLoan);
                return {
                   ...state,
                   loans: newLoans,
                   showLoanComponent:false
                   
            }
        }
        case actionTypes.DELETE_LOAN:
            {
                let mirorArray = [...state.loans];
                let newLoans = [];
                mirorArray.map((a,index)=>{
                    if(index !== action.value){
                        newLoans.push(a);
                    }
                })
                // newLoans.splice(action.value,1);
                return {
                   ...state,
                   loans: newLoans
                   
            }
        }
        case actionTypes.INSPECT_LOAN:
            {
                return {
                    ...state,
                    inspectLoan: action.value
                   
            }
        }
       
        
    }
    
    return state;
}


export default reducer;