import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import combinedReducers from './reducers';
import { loadState, saveState } from './localStorage';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const persistedState = loadState();

const Store = createStore(combinedReducers, persistedState,
  compose(
    applyMiddleware(
      sagaMiddleware,
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ));

sagaMiddleware.run(rootSaga);

Store.subscribe(() => {
  saveState({
    cart: Store.getState().cart,
  });
});

export default Store;
