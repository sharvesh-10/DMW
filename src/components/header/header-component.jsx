import React from 'react';
import './header-component-styles.scss'
import { Link } from 'react-router-dom';
//import { ReactComponent as Logo } from "../../assets/supermarket.svg";
/*import logo from '../../assets/logo1.png'*/
import {auth} from '../../firebase/firebase-utils';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import { selectCurrentUser } from '../../redux/user/user-selectors';

const Header = ({currentUser, hidden}) => (
    <div className='header'>
        <div className='options'>
            <Link className='option' to='/home'>
                HOME
            </Link>
            {
                currentUser ? <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div> : <Link className='option' to='/signin'>SIGN IN</Link>
            }
            {
                currentUser ? ( currentUser.email === "sharvesh.shark@gmail.com" ?(<div className='option'>ADMIN</div>): null) : null
            }
        
        </div>
        
        
    </div>

)

const mapStateToProps = createStructuredSelector ({
    currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(Header);