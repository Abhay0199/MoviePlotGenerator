import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import App from './moviesSearch.jsx';

class MainComponent extends Component {
    render() {
        return (
            <div className='container'>
                <Navbar />

                <Switch>
                    <App />
                </Switch>

            </div>
        );
    }
}

export default MainComponent;
