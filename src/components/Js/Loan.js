import React, { Component } from 'react';
import '../Css/Loan.css'
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actionTypes'
import calculator from '../../img/calculator-icon.png'



class Loan extends Component {
    state = {  }


    setSingleLoanDetailInLoaclStete = (e,key) =>
    {
        this.setState({[key] : e.target.value});
        console.log(this.state);
    }


    render() { 
        return ( 
            <div className="mainSingleDiv flipInX animated shadow-lg p-3 mb-5 bg-white rounded">
            <table>
            <tbody>
                <tr>
                    <td></td>
                    <td style={{textDecoration:'underline'}}>הלוואה חדשה</td>
                    <td></td>
                    
                </tr>
                <tr>
                    <td>סכום נוכחי </td>
                    <td className="calculatorImgTd"><img className="calculatorImg" alt="calculator Img" src={calculator} /></td>
                    <td><input id="amount" onChange={(e) => this.setSingleLoanDetailInLoaclStete(e,'amount')} placeholder='0'  type="number" className="form-control"/></td>
                    
                </tr>
                <tr>
                    <td>ריבית שנתית  </td>
                    <td className="calculatorImgTd"><img className="calculatorImg" alt="calculator Img" src={calculator} /></td>
                    <td><input  type="number" onChange={(e) => this.setSingleLoanDetailInLoaclStete(e,'interest')} className="form-control"/></td>
                    
                </tr>
                <tr>
                    <td>החזר חודשי  </td>
                    <td className="calculatorImgTd"><img className="calculatorImg" alt="calculator Img" src={calculator} /></td>
                    <td><input  type="number" onChange={(e) => this.setSingleLoanDetailInLoaclStete(e,'pmt')} className="form-control"/></td>
                    
                </tr>
                <tr>
                    <td>מספר חודשים  </td>
                    <td className="calculatorImgTd"><img className="calculatorImg" alt="calculator Img" src={calculator} /></td>
                    <td><input  type="number" onChange={(e) => this.setSingleLoanDetailInLoaclStete(e,'months')} className="form-control"/></td>
                    
                </tr>
                <tr>
                    <td>סוג הצמדה </td>
                    <td></td>
                    <td>  
                        <select  onChange={(e) => this.setSingleLoanDetailInLoaclStete(e,'linkageIndex')} className="form-control">
                            <option value="ללא">ללא</option>
                            <option value="מדד">מדד</option>
                            <option value="דולר">דולר</option>
                            <option value="יורו">יורו</option>
                            <option value="אג''ח">אג"ח</option>
                        </select>
                    </td>
                   
                </tr>
                <tr>
                    <td></td>
                    {/* <td><button className="btn btn-info" onClick={this.sendData}>הכנס את ההלוואה</button></td> */}
                    <td><button className="btn btn-info" onClick={() => this.props.InsertNewLoan(this.state)}>הכנס את ההלוואה</button></td>
                    <td></td>
                </tr>




                </tbody>
            </table>
        </div>


         );

    }
}


const mapDispatchToProps = dispatch =>
{
    return {
        InsertNewLoan: (newLoan) => dispatch({type:actionTypes.INSERT_NEW_LOAN,value:newLoan}),
       
    }
}


export default connect(null,mapDispatchToProps)(Loan);