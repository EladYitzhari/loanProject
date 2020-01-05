import React, { Component } from 'react';
import '../Css/LoansTable.css'
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actionTypes'
import garbegeImg from '../../img/bin-red-full-icon.png'
import eyeImg from '../../img/eye-icon.png'
import LoanIdCard from './LoanIdCard';

class LoansTable extends Component {
    state = { 
        showLoanIdCard:false,
        inspectLoan:0
     }



     ChooseLoanToInspect=(id)=>{

         this.setState({
                        showLoanIdCard: !this.state.showLoanIdCard
                        });

     }



    render() { 

        let loanIdCard = null;
        if(this.state.showLoanIdCard){
            loanIdCard =  <LoanIdCard loanDetails={this.props.loans[this.state.inspectLoan]}/>;
        }

        return ( 
            <React.Fragment>
            <table className='loansTable table table-hover'>
                <thead>
                <tr className='loanTableTH'>
                    <th>קוד</th> 
                    <th>סכום</th> 
                    <th>סכום החזר</th>  
                    <th>תקופה בחודשים</th> 
                    <th>ריבית שנתית</th>
                    <th>סוג הצמדה</th>
                    <th>פעולות</th>
                </tr>
                </thead>
                <tbody>
                {this.props.loans.map( (loan,index) => {
                    
                    return (
                       
                    <tr key={'loanRow'+index} className="loanTableTD">
                        <td>{index+1}</td>
                        <td>{loan.PV}</td>
                        <td>{loan.pmt}</td>
                        <td>{loan.n}</td>
                        <td>{loan.interest}</td>
                        <td>{loan.linkageIndex}</td>
                        <td>
                            <img className='loanTableImg' src={garbegeImg} alt="garbageImg" onClick={()=> this.props.DeleteLoan(index)}/>
                            <img className='loanTableImg' src={eyeImg} alt='eyeImg' onClick={()=>this.props.LoanToInspect(index)}/>
                        </td>
            
                    </tr>              
                    )
                })}
                </tbody>
            </table>

                {loanIdCard}
               
           </React.Fragment>
         );
    }
}

const mapStateToProp = state =>
{
    return {
        loans: state.main.loans
        }
}

const mapDispatchToProps = dispatch =>
{
    return {
        DeleteLoan: (val) => dispatch({type:actionTypes.DELETE_LOAN,value:val}),
        LoanToInspect: (val) => dispatch({type:actionTypes.INSPECT_LOAN,value:val})
    }
}


 
export default connect(mapStateToProp,mapDispatchToProps)(LoansTable);