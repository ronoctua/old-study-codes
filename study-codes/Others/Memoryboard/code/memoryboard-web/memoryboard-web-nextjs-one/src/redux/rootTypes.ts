import rootReducer from './rootReducer';
import store from './rootStore';

export type StateType = ReturnType<typeof rootReducer>;

export type DispatchType = typeof store.dispatch;
