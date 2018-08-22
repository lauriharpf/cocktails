import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import rootSaga from './sagas';

export default function configureStore(history, initialState) {
    const sagaMiddleware = createSagaMiddleware();
    const rootReducer = combineReducers({ app: reducer, routing: routerReducer });
    const middleware = [
        sagaMiddleware,
        routerMiddleware(history)
    ];

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleware)));
    sagaMiddleware.run(rootSaga);

    return store;
}