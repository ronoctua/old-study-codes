import { createStore, Store } from 'redux';

import rootReducer from './rootReducer';

const store: Store = createStore(rootReducer);

export default store;
