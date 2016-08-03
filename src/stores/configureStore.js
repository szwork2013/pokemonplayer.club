import {createStore as _createStore, applyMiddleware, compose} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'
// import clientMiddleware from '../middlewares/clientMiddleware'
import rootReducer from '../reducers'


let __DEVELOPMENT__ = true;

export default function configureStore(initialState, history, client) {
    // Sync dispatched route actions to the history
    const reduxRouterMiddleware = routerMiddleware(history);

    // const middleware = [thunk, clientMiddleware(client), reduxRouterMiddleware];
    const middleware = [thunk, reduxRouterMiddleware];

    let finalCreateStore;
    if (__DEVELOPMENT__) {
        const DevTools = require('../containers/DevTools/DevTools');
        const createLogger = require('redux-logger');
        finalCreateStore = compose(
            applyMiddleware(createLogger(), ...middleware),
            window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument()
        )(_createStore);
    } else {
        finalCreateStore = applyMiddleware(...middleware)(_createStore);
    }
    const store = finalCreateStore(rootReducer, initialState);

    console.log(module.hot);
    if (__DEVELOPMENT__ && module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default;
            store.replaceReducer(nextRootReducer)
        })
    }

    return store;
}
