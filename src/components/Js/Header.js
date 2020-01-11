import React, { Component } from 'react';
import {Route,NavLink} from 'react-router-dom'
import SingleLoanPage from '../../containers/Js/SingleLoanPage'
import HomePage from '../../containers/Js/HomePage'
import '../Css/Header.css'
import owl from '../../img/owl-icon.png'

class Header
 extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="header_main">
                <ul className="header_ul">
                    <li className="header_li"><NavLink to="/Home">דף הבית</NavLink></li>  
                    <li className="header_li"><NavLink to="/SingleLoanPage">פרטי הלוואה</NavLink></li>
                    <li className="header_li owl-icon"><img src={owl}/></li>
                </ul>
            


            <Route path="/Home" exact component={HomePage}   />
            <Route path="/SingleLoanPage" exact component={SingleLoanPage}   />
            </div>



         );
    }
}
 
export default Header
;