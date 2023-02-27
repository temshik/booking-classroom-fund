import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import catalogReducer from './slice/catalogSlice';

const rootReducer = combineReducers({
    auth: authReducer,    
    catalog: catalogReducer, 
});

const store = configureStore({
    reducer: rootReducer,
    
});

export default store;