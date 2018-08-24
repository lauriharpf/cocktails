import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import rootSaga from './sagas';

export default function configureStore(history, initialState) {
    const sagaMiddleware = createSagaMiddleware();
    const middleware = [
        sagaMiddleware,
        routerMiddleware(history)
    ];

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        connectRouter(history)(combineReducers({ app: reducer })),
        initialState,
        composeEnhancers(applyMiddleware(...middleware))
    );
    sagaMiddleware.run(rootSaga);

    return store;
}