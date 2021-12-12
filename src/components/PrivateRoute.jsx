import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('token')
            ? <Component {...props} /> //https://reactrouter.com/web/api/Route/render-func
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)