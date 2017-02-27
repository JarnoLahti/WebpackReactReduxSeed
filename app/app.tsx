import 'bootstrap/dist/css/bootstrap.css'

import * as React from "react";
import * as ReactDOM from "react-dom";

import * as reactTapEventPlugin from 'react-tap-event-plugin';
import store from './appState/store'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux'
import { BaseContainer } from './components/baseComponent/base';

reactTapEventPlugin();

ReactDOM.render(
    <MuiThemeProvider>
        <Provider store={store}>
            <div className="container">
                <BaseContainer/>
            </div>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('app')
);