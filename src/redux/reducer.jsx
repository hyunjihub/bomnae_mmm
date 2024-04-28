import { combineReducers } from 'redux';
import login from './login';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['login'],
};

const rootReducer = combineReducers({
  login,
});

export default persistReducer(persistConfig, rootReducer);
