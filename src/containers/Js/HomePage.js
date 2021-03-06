import React, { Component } from 'react';
import '../css/HomePage.css'
import loanFolder from '../../img/Loan.JPG'
import Loan from '../../components/Js/Loan';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actionTypes'
import LoansTable from '../../components/Js/LoansTable'
import ChartLoanLife from '../../components/Js/ChartLoanLife'
import { Grid ,Table, Icon,Button,Select} from 'semantic-ui-react'


class HomePage extends Component {

    state = { 
        
     }

    render() { 

        let loan = null;
        if(this.props.showLoanComponent)
        {
            loan = <div><Loan key="loan"></Loan> </div>
        }

        let loansTable= null;
        let loanChart = null;
        if(this.props.loans.length>0)
        {
            loansTable =<LoansTable></LoansTable>;
            loanChart = <ChartLoanLife />;
        }
        return ( 
            <div>
           <div className="homePage_header">
              <div>ברוכים הבאים לאפליקציית תיק הלוואות</div>
              <img src={loanFolder} alt='loanImg'/><br />
              <Button size='huge' color='instagram' onClick={this.props.toggleLoan}>הוספת הלוואה לתיק<Icon name='add' />  </Button>
           </div>
           
          
           <Grid centered style={{margin:'1%'}}>
           <Grid.Row>
           <Grid.Column textAlign='center' width={8}>
           {loansTable}
           </Grid.Column>
           <Grid.Column  floated='left' width={8}>
           {loanChart}
           </Grid.Column>
           </Grid.Row>
           </Grid>
           {loan}
           </div>
 
           
         );
    }
}



const mapStateToProp = state =>
{
    return {
        showLoanComponent: state.main.showLoanComponent,
        loans: state.main.loans
        }
}

const mapDispatchToProps = dispatch =>
{
    return {
        toggleLoan: () => dispatch({type:actionTypes.TOGGLE_LOAN_DIV}),
    }
}
 
export default connect(mapStateToProp,mapDispatchToProps)(HomePage);