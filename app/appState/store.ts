import { applyMiddleware, createStore} from 'redux';

import * as logger from 'redux-logger';
import promise from 'redux-promise-middleware'

import reducers from './combinedReducers'

const middleware = applyMiddleware(promise(), logger());

export default createStore(reducers, middleware);