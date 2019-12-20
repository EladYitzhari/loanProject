import React, { Component } from 'react';
import '../Css/LoansTable.css'
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actionTypes'
import garbegeImg from '../../img/bin-red-full-icon.png'


class LoansTable extends Component {
    state = {  }
    render() { 
        return ( 
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
                        <td><img src={garbegeImg} alt="garbageImg" onClick={(index) => this.props.deleteLoan(index)}/></td>
            
                    </tr>              
                    )
                })}
                </tbody>
            </table>
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
        deleteLoan: (val) => dispatch({type:actionTypes.DELETE_LOAN,value:val}),
    }
}


 
export default connect(mapStateToProp,mapDispatchToProps)(LoansTable);