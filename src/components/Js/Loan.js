import React, { Component } from 'react';
import '../Css/Loan.css'
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actionTypes'
import calculator from '../../img/calculator-icon.png'
import * as finance from '../Js/FinanceFunctions' 
import Spinner from './Spinner';
import LinkageIndexArray from './LinkageIndexArray';


class Loan extends Component {
    state = { 
        PV:0,
        interest:0,
        monthlyInterest:0,
        pmt:0,
        n:0,
        linkageIndex:"ללא",
        linkageIndexArray:[],
        pmtArray:[],
        showUploadSpinner:false
     }

    updateLinkedIndexArray=(linkageIndexArray)=>{
        let linkArray = [...linkageIndexArray];
        this.setState({linkageIndexArray:linkArray})
    }
    createPMTarray=()=>{
        let loanDetails={...this.state};
        let theArray=[];
        //the first pmt
        theArray.push({pmt:loanDetails.pmt,
            principal_begin:loanDetails.PV,
            pmt_Interest:loanDetails.PV*loanDetails.monthlyInterest/100,
            pmt_Principal:loanDetails.pmt-loanDetails.PV*loanDetails.monthlyInterest/100,
            principal_end:loanDetails.PV-(loanDetails.pmt-loanDetails.PV*loanDetails.monthlyInterest/100)
        })
        for( let i=1;i<loanDetails.n;i++){
           let row={pmt:loanDetails.pmt,
                principal_begin:theArray[i-1].principal_end,
                pmt_Interest:theArray[i-1].principal_end*loanDetails.monthlyInterest/100,
                pmt_Principal:loanDetails.pmt-theArray[i-1].principal_end*loanDetails.monthlyInterest/100,
                principal_end:theArray[i-1].principal_end-(loanDetails.pmt-theArray[i-1].principal_end*loanDetails.monthlyInterest/100)
            };
            theArray.push(row);

        }
        console.log(theArray);
        this.setState({pmtArray:theArray});
    }
    setSingleLoanDetailInLoaclStete = (e,key) =>
    {
        this.setState({[key] : e.target.value});
        if(key==='n'){
            this.setState({monthlyInterest:e.target.value/12});
        }
    
    }

    calculatePV =()=>
    {
        let loanDetails={...this.state};
        this.setState({PV:finance.PV(loanDetails.pmt,loanDetails.interest/12/100,loanDetails.n)});
    }
    calculatePMT =()=>
    {
        let loanDetails={...this.state};
        this.setState({pmt:finance.PMT(loanDetails.PV,loanDetails.interest/12/100,loanDetails.n)});
    }
    calculateInterest =()=>
    {
        let loanDetails={...this.state};
        let theInterest =finance.Interest(loanDetails.PV,loanDetails.pmt,loanDetails.n);
        this.setState({interest: theInterest });
        this.setState({monthlyInterest:theInterest/12});
    }

    insertNewLoan=()=>{
        this.setState({showUploadSpinner:true});
        this.createPMTarray();
        setTimeout(() => {
            this.props.InsertNewLoan(this.state);
        }, 2000);
        
    }
    render() { 

        let spinner = null;
        if(this.state.showUploadSpinner)
        {
            spinner =<Spinner/>;
        }

        let linkageIndexArray = null;
        if(this.state.linkageIndex !=="ללא"){
            let array= [];
            for(let i=0;i<this.state.n;i++){
                array.push(0);
            };
            linkageIndexArray = <LinkageIndexArray 
                                    n={array} 
                                    updateLinkedIndexArray={this.updateLinkedIndexArray}
                                    />
        }

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
                    <td className="calculatorImgTd"><img className="calculatorImg" alt="calculator Img" src={calculator} 
                            onClick={this.calculatePV}/></td>
                    <td><input id="PV" value={this.state.PV} onChange={(e) => this.setSingleLoanDetailInLoaclStete(e,'PV')} placeholder='0'  type="number" className="form-control"/></td>
                    
                </tr>
                <tr>
                    <td>ריבית שנתית  </td>
                    <td className="calculatorImgTd">
                        <img className="calculatorImg" alt="calculator Img" src={calculator} 
                            onClick={this.calculateInterest}/>
                    </td>
                    <td><input id='interest' value={this.state.interest} type="number" onChange={(e) => this.setSingleLoanDetailInLoaclStete(e,'interest')} className="form-control"/></td>
                    
                </tr>
                <tr>
                    <td>החזר חודשי  </td>
                    <td className="calculatorImgTd">
                        <img className="calculatorImg" alt="calculator Img" src={calculator} onClick={this.calculatePMT} />
                    </td>
                    <td><input id='pmt' value={this.state.pmt} type="number" onChange={(e) => this.setSingleLoanDetailInLoaclStete(e,'pmt')} className="form-control"/></td>
                    
                </tr>
                <tr>
                    <td>מספר חודשים  </td>
                    <td className="calculatorImgTd"></td>
                    <td><input id='n' value={this.state.n} type="number" onChange={(e) => this.setSingleLoanDetailInLoaclStete(e,'n')} className="form-control"/></td>
                    
                </tr>
                <tr>
                    <td>סוג הצמדה </td>
                    <td></td>
                    <td>  
                        <select value={this.state.linkageIndex}  onChange={(e) => this.setSingleLoanDetailInLoaclStete(e,'linkageIndex')} className="form-control">
                            <option value="ללא">ללא</option>
                            <option value="מדד">מדד</option>
                            <option value="דולר">דולר</option>
                            <option value="יורו">יורו</option>
                            <option value="אג''ח">אג"ח</option>
                        </select>
                    </td>
                </tr>
                {linkageIndexArray}
                <tr>
                    <td></td>
                    {/* <td><button className="btn btn-info" onClick={this.sendData}>הכנס את ההלוואה</button></td> */}
                    <td><button className="btn btn-info" onClick={this.insertNewLoan}>הוסף את ההלוואה</button></td>
                    <td>{spinner}</td>
                </tr>




                </tbody>
            </table>
            
        </div>


         );

    }
}

const mapStateToProp = state =>
{
    return {
        linkageIndexArray: state.main.linkageArray        
        }
}
const mapDispatchToProps = dispatch =>
{
    return {
        InsertNewLoan: (newLoan) => dispatch({type:actionTypes.INSERT_NEW_LOAN,value:newLoan}),
       
    }
}


export default connect(mapStateToProp,mapDispatchToProps)(Loan);