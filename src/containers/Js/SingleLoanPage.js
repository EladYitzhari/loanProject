import React, { Component } from 'react';
import '../css/SingleLoanPage.css'
import {Line,Bar,Pie} from 'react-chartjs-2';
import {connect} from 'react-redux';


class SingleLoanPage extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
              
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


export default connect(mapStateToProp,)(SingleLoanPage);