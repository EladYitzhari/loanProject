import React, { Component } from 'react';
import '../Css/LoansTable.css'
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actionTypes'
import garbegeImg from '../../img/bin-red-full-icon.png'
import eyeImg from '../../img/eye-icon.png'
import LoanIdCard from './LoanIdCard';
import { Table, Label,Button,Select} from 'semantic-ui-react'

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
            <Table celled collapsing>
                <Table.Header >
                    <Table.Row>
                        <Table.HeaderCell >קוד</Table.HeaderCell>
                        <Table.HeaderCell  >סכום</Table.HeaderCell> 
                        <Table.HeaderCell  >סכום החזר</Table.HeaderCell>  
                        <Table.HeaderCell  >תקופה בחודשים</Table.HeaderCell> 
                        <Table.HeaderCell  >ריבית שנתית</Table.HeaderCell>
                        <Table.HeaderCell  >סוג הצמדה</Table.HeaderCell>
                        <Table.HeaderCell  >פעולות</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                
                <Table.Body>
                {this.props.loans.map( (loan,index) => {
                    
                    return (
                       
                    <Table.Row key={'loanRow'+index} className="loanTableTD">
                       
 
                        <Table.Cell> <Label color='blue' size='big' ribbon='right'>{index+1}</Label></Table.Cell>
                        <Table.Cell>{loan.PV.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Table.Cell>
                        <Table.Cell>{loan.pmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Table.Cell>
                        <Table.Cell>{loan.n}</Table.Cell>
                        <Table.Cell>{loan.interest+"%"}</Table.Cell>
                        <Table.Cell>{loan.linkageIndex}</Table.Cell>
                        <Table.Cell>
                            <img className='loanTableImg' src={garbegeImg} alt="garbageImg" onClick={()=> this.props.DeleteLoan(index)}/>
                            <img className='loanTableImg' src={eyeImg} alt='eyeImg' onClick={()=>this.props.LoanToInspect(index)}/>
                        </Table.Cell>
            
                    </Table.Row>              
                    )
                })}
                </Table.Body>
           </Table>
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