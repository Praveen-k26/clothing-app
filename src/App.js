import React from 'react';
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shopPage/shop.component";
import Header from "./components/header/header.component ";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import  { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from "./redux/user/user.selector";
import './App.css';


class App extends React.Component {

    unsubscribeFromAuth = null;

    componentDidMount() {
        const {setCurrentUser} = this.props
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
           if (userAuth) {
               const userRef = await createUserProfileDocument(userAuth);

               userRef.onSnapshot(snapshot => {
                  setCurrentUser({
                          id: snapshot.id,
                          ...snapshot.data()
                  });
                  console.log('appJS-->',this.state);
               });
           }
               setCurrentUser(userAuth);
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route path='/shop' component={ShopPage} />
                    <Route path='/checkout' component ={CheckoutPage} />
                    <Route
                        exact path='/signin'
                        render={()=> this.props.currentUser ?
                            (<Redirect to='/' />) : (<SignInAndSignUpPage />)
                        }
                    />
                </Switch>
            </div>
            /*
             Render here is similar to the render key we use in our class component.
             It's a JS invokation that determines what
            component to return in the same place where "component ={}" would be
            * */

        );
    }
}

//of the state destructured user reducer and return currentUser prop
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps )(App);
