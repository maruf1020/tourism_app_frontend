import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./pages/login";
import SignUp from "./pages/signup";
import UserMainPage from "./pages/userMainPage"
import AdminMainPage from './pages/adminMainPage';
import UserReviewPage from './pages/userReviewPage';
import AdminReviewPage from './pages/adminReviewPage';

function App() {
  return (<Router>
    <Switch>
      <Route path="/userMainPage" component={UserMainPage} />
      <Route path="/AdminMainPage" component={AdminMainPage} />
      <Route path="/UserReviewPage" component={UserReviewPage} />
      <Route path="/AdminReviewPage" component={AdminReviewPage} />



      <Route exact path='/' component={Login} />
      <Route path="/sign-in" component={Login} />
      <Route path="/sign-up" component={SignUp} />


    </Switch></Router>
  );
}

export default App;