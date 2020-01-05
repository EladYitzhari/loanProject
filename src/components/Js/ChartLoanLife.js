import React, { Component } from 'react';
import '../Css/ChartLoanLife.css'
import {Line,Bar,Pie} from 'react-chartjs-2';
import {connect} from 'react-redux';


class ChartLoanLife extends Component {
    state = {  }
    CrateChartData =() =>{
        let loanNum = this.props.inspectLoan;
        let labels = [];
        let interestArray =[];
        let principalArray =[];
        this.props.loans[loanNum].pmtArray.map((a,index)=>{
            labels.push(index+1);
            interestArray.push(a.pmt_Interest);
            principalArray.push(a.pmt_Principal);
        });
        let datasets =[
            {
                label: 'Principal',
                data: principalArray,
                backgroundColor: '#D6E9C6' // green 
            },
            {
                label: 'Interest',
                data: interestArray,
                backgroundColor: '#FAEBCC'// green
            }
        ];
        return {
            labels: labels,
            datasets: datasets
        }
    }

    render() { 

        
        return ( 
            <Bar   width='700' height='700' 
            data = {this.CrateChartData()}
            
            options= {{
                responsive:false,
                scales: {
                  xAxes: [{ stacked: true }],
                  yAxes: [{ stacked: true }]
                }
              }  } 
           
            />
         );
    }
}
 


const mapStateToProp = state =>
{
    return {
        loans: state.main.loans,
        inspectLoan: state.main.inspectLoan
        }
}

export default connect(mapStateToProp,)(ChartLoanLife);