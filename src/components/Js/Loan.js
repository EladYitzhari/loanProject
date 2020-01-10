import React, { Component } from 'react';
import '../Css/Loan.css'
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actionTypes'
import calculator from '../../img/calculator-icon.png'
import * as finance from '../Js/FinanceFunctions' 
import Spinner from './Spinner';
import LinkageIndexArray from './LinkageIndexArray';
import { Input ,Table, Icon,Button,Select} from 'semantic-ui-react'

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
            let row;
            if(this.state.linkageIndexArray.length===0){
                row={pmt:loanDetails.pmt,
                    principal_begin:theArray[i-1].principal_end,
                    pmt_Interest:theArray[i-1].principal_end*loanDetails.monthlyInterest/100,
                    pmt_Principal:loanDetails.pmt-theArray[i-1].principal_end*loanDetails.monthlyInterest/100,
                    principal_end:theArray[i-1].principal_end-(loanDetails.pmt-theArray[i-1].principal_end*loanDetails.monthlyInterest/100)
                };
            }else{
                let newPvAfterLinkage = (this.state.linkageIndexArray.length===0) ?0: theArray[i-1].principal_end*(1+loanDetails.linkageIndexArray[i-1]/100);
                let newPmtAfterLinkage = (this.state.linkageIndexArray.length===0) ?0:finance.PMT(newPvAfterLinkage,loanDetails.interest/12/100,loanDetails.n-i);
                row={
                    originalPmt:loanDetails.pmt,
                    pmt:newPmtAfterLinkage,
                    principal_begin:newPvAfterLinkage,
                    pmt_Interest:newPvAfterLinkage*loanDetails.monthlyInterest/100,
                    pmt_Principal:newPmtAfterLinkage-newPvAfterLinkage*loanDetails.monthlyInterest/100,
                    principal_end:newPvAfterLinkage-(newPmtAfterLinkage-newPvAfterLinkage*loanDetails.monthlyInterest/100)
                };
            }
  
            theArray.push(row);

        }
        console.log(theArray);
        this.setState({pmtArray:theArray});
    }
    setSingleLoanDetailInLoaclStete = (e,key) =>
    {
        this.setState({[key] : e.target.value});
        if(key === 'n'){
            this.setState({monthlyInterest:this.state.interest/12});
        }
    
    }
    setLinkageType=(e,data)=>{
        this.setState({linkageIndex:data.value});
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

    aaa=()=>{
        alert('test')
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
           <Table celled textAlign='right' >
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell textAlign='right' colSpan='3'>הלוואה חדשה</Table.HeaderCell>
            </Table.Row>
            </Table.Header>

            <Table.Body>       
            <Table.Row>
                <Table.Cell> סכום נוכחי </Table.Cell> 
                <Table.Cell><Icon name='calculator'  onClick={this.calculatePV}/></Table.Cell>         
                <Table.Cell>
                    <Input id="PV" type='number' onChange={(e) => this.setSingleLoanDetailInLoaclStete(e,'PV')} icon='cart' value={this.state.PV} iconPosition='left' placeholder='0' />
                </Table.Cell>   
             </Table.Row>
             <Table.Row>
                <Table.Cell>ריבית שנתית </Table.Cell> 
                <Table.Cell><Icon name='calculator'  onClick={this.calculateInterest}/></Table.Cell>         
                <Table.Cell>
                    <Input id="interest" type='number' onChange={(e) => this.setSingleLoanDetailInLoaclStete(e,'interest')} icon='info' value={this.state.interest} iconPosition='left' placeholder='0' />
                </Table.Cell>   
             </Table.Row>
             <Table.Row>
                <Table.Cell>החזר חודשי </Table.Cell> 
                <Table.Cell><Icon name='calculator'  onClick={this.calculatePMT}/></Table.Cell>         
                <Table.Cell>
                    <Input id="pmt" type='number' onChange={(e) => this.setSingleLoanDetailInLoaclStete(e,'pmt')} icon='credit card' value={this.state.pmt} iconPosition='left' placeholder='0' />
                </Table.Cell>   
             </Table.Row>
             <Table.Row>
                <Table.Cell> מספר חודשים </Table.Cell> 
                <Table.Cell></Table.Cell>         
                <Table.Cell>
                    <Input id="n" type='number' onChange={(e) => this.setSingleLoanDetailInLoaclStete(e,'n')} icon='calendar alternate' value={this.state.n} iconPosition='left' placeholder='0' />
                </Table.Cell>   
             </Table.Row>
             <Table.Row>
                <Table.Cell> סוג הצמדה </Table.Cell> 
                <Table.Cell></Table.Cell>         
                <Table.Cell>
                <Select   
                 options={[
                    { key: 'ללא', text: 'ללא', value: 'ללא' },
                    { key: 'מדד', text: 'מדד', value: 'מדד' },
                    { key: 'דולר', text: 'דולר', value: 'דולר' },
                    { key: 'יורו', text: 'יורו', value: 'יורו' },
                    { key: 'אגח', text: 'אגח', value: 'אגח' }
                    ]} defaultValue='ללא' 
                    onChange={this.setLinkageType}/>
                </Table.Cell>   
             </Table.Row>

             {linkageIndexArray}
                </Table.Body>
               
                <Table.Footer fullWidth>
                    <Table.Row>
                   
                    <Table.HeaderCell colSpan='3'>
                    <Button
                         onClick={this.insertNewLoan}
                        floated='right'
                        icon
                        labelPosition='left'
                        primary
                        size='big'
                    >
                        <Icon name='add circle' /> הוסף הלוואה
                    </Button>
                    {spinner}
                    </Table.HeaderCell>

                    </Table.Row>
                </Table.Footer>
             </Table>      
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