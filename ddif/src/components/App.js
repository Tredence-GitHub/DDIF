import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './Layout';
import '../App.css';
import Login from './Login';
import Register from './Register';
// import Registertest from './Registertest';
import ChangePassword from './ChangePassword';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Button from '@material-ui/core/Button';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/recover" component={ChangePassword}/>
        { localStorage.getItem('loggedIn') === 'true' ? <Layout/> :
           <div>
             <p>Unauthorized access</p>
             <br/>
             <Button variant="outlined" color="primary" href='/'>
                Back To Login
              </Button>
            </div> }
        {/* <Layout/> */}
      </Switch>
    </Router>
    
  );
}


export default App;
