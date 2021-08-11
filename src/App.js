import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component.jsx';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';


const HatsPage = (props) => {
  console.log(props)
  return(
    <div>
      <h1>HATS PAGE </h1>
    </div>
  );
};

const JacketsPage = () => (
  <div>
    <h1>JACKETS PAGE</h1>
  </div>
);

const SneakersPage = () => (
  <div>
    <h1>SNEAKERS PAGE</h1>
  </div>
);

const WomensPage = () => (
  <div>
    <h1>WOMENS PAGE</h1>
  </div>
);

const MensPage = () => (
  <div>
    <h1>MENS PAGE</h1>
  </div>
);

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
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
        <Route path='/signin' component={SignInAndSignUpPage} />
        <Route path='/hats' component={HatsPage} />
        <Route path='/jackets' component={JacketsPage} />
        <Route path='/sneakers' component={SneakersPage} />
        <Route path='/womens' component={WomensPage} />
        <Route path='/mens' component={MensPage} />
      </Switch>
    </div>
  );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);
