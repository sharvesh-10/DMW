import React from 'react';
import {Switch,Route, Redirect} from 'react-router-dom';
import {auth, createUserProfileDocument} from '../src/firebase/firebase-utils'
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user-actions';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from './redux/user/user-selectors'
import Header from './components/header/header-component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-page';
import Footer from './components/footer/contact-componen';
import HomePage from './pages/home/homepage';
import './App.css'
class App extends React.Component{

  unsubscribeFromAuth = null;
  componentDidMount(){
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth=auth.onAuthStateChanged( async userAuth => {
       if(userAuth){
          const userRef = await createUserProfileDocument(userAuth);
          userRef.onSnapshot(snapshot => {
            setCurrentUser({
                id: snapshot.id,
                ...snapshot.data()
            });
          });
       }
    
         setCurrentUser(userAuth); 
       
    });
    
  }
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }


  render(){
  return (
    <div>
      <Header/>
      <Switch>
        <Route path='/home' component={HomePage} />
        <Route 
          exact 
          path='/signin' 
          render = {() => this.props.currentUser ? (<Redirect to='/'/>) 
            : (<SignInAndSignUpPage/>) } 
        />
        {/*<Route path='/additems' component={AddItems}/>*/}
      </Switch>
      <Footer/>
    </div>
  );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser 
})
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(App);