import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';

function Header() {
    return(
        <div>
            <Router>
                <Switch>
                    <Route exact path="/home" component={Home}/>
                </Switch>
            </Router>
        </div>
    )
}

export default Header