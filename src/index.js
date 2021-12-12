import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import axios from 'axios';

import authService from './services/authService';
import rootReducer from './reducers'
import { history } from './helpers';
import './index.css';
import App from './App';
// import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.baseURL = 'http://localhost:8000';

axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        history.push('/login')
    }
    return error.response;
});
axios.defaults.headers.common['Authorization'] = authService.getAuthHeader();
//axios.defaults.headers.common['Access-Control-Allow-Credentials'] = false;

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
