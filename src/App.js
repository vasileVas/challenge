import React from 'react';
import './App.css';

import ApolloClient from 'apollo-client';
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import {
  HashRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Token from './components/Token';
import Profile from './components/Profile';


const cache = new InMemoryCache({
  dataIdFromObject: o => o.id
});
const link = new HttpLink({
  uri: "http://localhost:4000/graphql"
});
const client = new ApolloClient({
  cache,
  link
});

const App = () => (
  <ApolloProvider client={client}>
    <Router>
    <nav>
    <div className="nav-wrapper">
      <ul id="nav-mobile" className="right">
        <li><Link to="/">Signup</Link></li>
        <li><Link to="/signIn">SignIn</Link></li>
        <li><Link to="/token">Token</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </div>
  </nav>
      <div className="container App">
        <Switch>
          <Route exact path="/" component={SignUp} />
          <Route exact path="/signIn" component={SignIn} />
          <Route exact path="/token" component={Token} />
          <Route exact path="/profile" component={Profile} />
        </Switch>  
      </div>
    </Router>
  </ApolloProvider>
);

export default App;
