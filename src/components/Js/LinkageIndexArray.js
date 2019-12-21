import React, { Component } from 'react';
import '../Css/LinkageIndexArray.css'



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
                    return <tr className='linkageTr' key={'linkageTr'+index}>
                        <td className='textTdLinkageArray'>תקופה {index+1}</td>
                        <td>%</td>
                        <td><input type='number' className='form-control' onChange={(e)=>this.updateLinkageInterest(e,index)} value={n}/></td>
                    </tr>
                })}
            </React.Fragment>
        );
    }
}
 


export default LinkageIndexArray;
