import {Action, combineReducers, configureStore} from '@reduxjs/toolkit';
import Reactotron from '../../ReactotronConfig';
import user from './slicers/user';

const combinedReducers = combineReducers({
  user,
});

const rootReducer = (state: any | undefined, action: Action) =>
  combinedReducers(state, action);

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  enhancers: defaultEnhancers => [
    Reactotron.createEnhancer!(),
    ...defaultEnhancers,
  ],
});

export type AppDispatch = typeof store.dispatch;

export default store;
