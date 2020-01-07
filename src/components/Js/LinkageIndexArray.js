import React, { Component } from 'react';
import '../Css/LinkageIndexArray.css'
import { Input ,Table, Icon,Button,Select} from 'semantic-ui-react'



class LinkageIndexArray extends Component {
    state = { linkageArray:[] }

    componentDidMount=()=>{
        this.setState({linkageArray:this.props.n})
    }

    updateLinkageInterest=(event,n)=>{
        let value = event.target.value;
        let mirrorArray = [...this.state.linkageArray];
        for(let i=0;i<mirrorArray.length;i++){
            if(n <= i){
                mirrorArray[i]= value;
            }
        }
        this.setState({linkageArray:mirrorArray});
        this.props.updateLinkedIndexArray(mirrorArray);
    }
    render() { 
        return (  
            <React.Fragment>
                {this.state.linkageArray.map((n,index)=>{
                    return (
                    <Table.Row  key={'linkageTr'+index}>
                        <Table.Cell>תקופה {index+1}</Table.Cell>
                        <Table.Cell>%</Table.Cell>
                        <Table.Cell><Input type='number'
                        onChange={(e)=>this.updateLinkageInterest(e,index)} value={n}
                        /></Table.Cell>
                    </Table.Row>
                    )
                    
                    
                })}
            </React.Fragment>
        );
    }
}
 


export default LinkageIndexArray;
