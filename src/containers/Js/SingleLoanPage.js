import React, { Component } from 'react';
import '../css/SingleLoanPage.css'
import {Line,Bar,Pie} from 'react-chartjs-2';
import {connect} from 'react-redux';


class SingleLoanPage extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
            <div>
                Single loan page
                <Bar   width='700' height='700' 
                data= {{
                   
                    labels: ['Risk Level','ttt'],
                    datasets: [
                        {
                          label: 'Low',
                          data: [67.8,2],
                          backgroundColor: '#D6E9C6' // green
                        },
                        {
                          label: 'Moderate',
                          data: [20.7,5],
                          backgroundColor: '#FAEBCC' // yellow
                        },
                        {
                          label: 'High',
                          data: [11.4,22],
                          backgroundColor: '#EBCCD1' // red
                        }
                      ]
                  }
                }
                options= {{
                    responsive:false,
                    scales: {
                      xAxes: [{ stacked: true }],
                      yAxes: [{ stacked: true }]
                    }
                  }  } 
               
                />
            </div>
            {this.props.loans[0]["pmtArray"].map(pmt=>{
                return <div>{pmt.pmt_Interest}</div>
            })}
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