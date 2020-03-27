import React from 'react';
import { lazy, Suspense } from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {GlobalStyle} from './global.styles';

import Header from './components/header/header';
import Spinner from './components/spinner/spinner';
import ErrorBoundary from './components/error-boundary/error-boundary';

import { selectCurrentUser } from './redux/user/user.selectors';
import {checkUserSession} from './redux/user/user.actions';

const HomePage = lazy(() => import('./pages/homepage/homepage'));
const ShopPage = lazy(() => import('./pages/shop/shop'));
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout'));

class App extends React.Component {
  unsubscribeFromAuth = null; 
  
  componentDidMount(){
    const {checkUserSession} = this.props;
    checkUserSession();
  }
  
  // /*we have to close subscription when unmount because we don't want memory leaks in our js app
  // related to listeners still being open even if the component that cares about the listener is no longer on the page*/
   componentWillUnmount(){
     this.unsubscribeFromAuth();
   }

  render(){
    const {currentUser} = this.props;
    return (
      <div>
        <GlobalStyle />
        <Header />
        {/*header out of the switch because we want it to display in all pages*/}
        {/*we pass currentUser to make header aware of user sign in or sign out*/}
        {/*The exact param disables the partial matching for a route and makes sure
         that it only returns the route if the path is an EXACT match to the current url*/}
        <Switch>{/*it allows for nested routes to work properly*/} 
        <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />

          <Route exact path='/signin' render={() =>
            currentUser ? 
            (<Redirect to='/' />):
            (<SignInAndSignUpPage/>)
            }
            />
            {/*render is js invocation that determines what component to return
            so it's in the same place of component but instead it will be some js*/}
          </Suspense>
          </ErrorBoundary>
          {/*Suspense allows you to wrap any part of your application that might be rendering asynchronous components*/}
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
  /*collectionsArray: selectCollectionsForPreview*/
});/*we use this function to be able to use currentUser state in code it's like this.state*/

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps,mapDispatchToProps)(App);

/*App component don't need currentUser anymore it's only setState it
so we will pass null as first argument*/

/*if we use currentUser state from user.reducer then we will replace null with mapStateToProps*/

/*whenever you dispatch, all reducers are called, which is why there is no relation between reducer and action
what matter is only the action type because reducer check this*/

/*Reducer check action type --> action type check action --> action give payload to reducer --> 
  reducer return the new state to store --> store pass new props to the component)*/