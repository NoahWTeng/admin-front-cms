import { createStore, applyMiddleware, compose } from 'redux';
import { authMdl, apiMdl, uiMdl, languageMdl } from '@middleware';

// import thunk from 'redux-thunk';
import { rootReducer } from '@reducers';

// const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  // middleware.push();
}
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(...authMdl, ...uiMdl, ...languageMdl, apiMdl)
  )
);
