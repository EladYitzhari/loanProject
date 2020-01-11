import React, { Component } from 'react';
import '../Css/ChartLoanLife.css'
import {Line,Bar,Pie} from 'react-chartjs-2';
import {connect} from 'react-redux';
import { Table } from 'semantic-ui-react';
import ReactToExcel from 'react-html-table-to-excel';
import excelIcon from  '../../img/Microsoft-Excel-icon.png'

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
            <React.Fragment>
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
            <ReactToExcel className="btn "
                                table='paymentsTable'
                                filename="Payments Report"
                                sheet={"הלוואה מספר "+Number(Number(this.props.inspectLoan)+1)}
                                buttonText={<img style={{marginRight:"3%"}} alt="excelImg" src={excelIcon} />}
                                />
            <Table textAlign='right' id='paymentsTable'>
                <Table.Header>
                    <Table.Row>  
                        <Table.HeaderCell >יתרת פתיחה</Table.HeaderCell>
                        <Table.HeaderCell >סך תשלום</Table.HeaderCell>
                        <Table.HeaderCell >תשלום קרן</Table.HeaderCell>
                        <Table.HeaderCell >תשלום ריבית</Table.HeaderCell>
                    {(this.props.loans[this.props.inspectLoan].linkageIndexArray.length >0)?
                        <Table.HeaderCell >תשלום הפרש מדד</Table.HeaderCell>:
                        null}
                        <Table.HeaderCell >יתרת סגירה</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.props.loans[this.props.inspectLoan].pmtArray.map((a,index)=>{
                        return(
                            <Table.Row>
                                <Table.Cell>{Number(a.principal_begin).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Table.Cell>
                                <Table.Cell>{Number(a.pmt).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Table.Cell>
                                <Table.Cell>{Number(a.pmt_Principal).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Table.Cell>
                                <Table.Cell>{Number(a.pmt_Interest).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Table.Cell>
                               
                                {(this.props.loans[this.props.inspectLoan].linkageIndexArray.length >0)?
                                     <Table.Cell>{Number(a.pmt-a.originalPmt).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Table.Cell>:
                                    null}
                                <Table.Cell>{Number(a.principal_end).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
            </React.Fragment>

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