import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import {SnackbarProvider} from 'notistack';

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./index.css";

import Circularln from './components/CircularIndeterminate';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <div id="circularln" style={{display: 'none'}}>
                <Circularln/>
            </div>
            <SnackbarProvider>
                <App/>
            </SnackbarProvider>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();