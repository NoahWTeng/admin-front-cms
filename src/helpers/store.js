import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from '@reducers';

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push();
}

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);
