import React, { Component } from 'react';
import '../css/HomePage.css'
import loanFolder from '../../img/dollar-folder-icon.png'
import Loan from '../../components/Js/Loan';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actionTypes'


class HomePage extends Component {

    state = { 
        
     }

    render() { 

        let loan = null;
        if(this.props.showLoanComponent)
        {
            loan = <div><Loan key="loan"></Loan> </div>
        }

        return ( 
            <div>
           <div className="homePage_header">
              <div>לברוכים הבאים לאפליקציית תיק הלוואות</div>
              <img src={loanFolder}/>
           </div>
           <button onClick={this.props.toggleLoan}  className='btn homePage_newLoanBtn'>הוספת הלוואה לתיק</button>
           {loan}
           </div>
           
         );
    }
}



const mapStateToProp = state =>
{
    return {
        showLoanComponent: state.main.showLoanComponent
        }
}

const mapDispatchToProps = dispatch =>
{
    return {
        toggleLoan: () => dispatch({type:actionTypes.TOGGLE_LOAN_DIV}),
    }
}
 
export default connect(mapStateToProp,mapDispatchToProps)(HomePage);