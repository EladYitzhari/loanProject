import * as actionTypes from '../store/actionTypes'


const initialState = {
    showLoanComponent: false,
    loans:[]
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
                let newLoans = [...state.loans];
                newLoans.push(action.value);
                return {
                   ...state,
                   loans: newLoans
                   
            }
        }
        
    }
    
    return state;
}


export default reducer;