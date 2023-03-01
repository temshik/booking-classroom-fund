import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import catalogReducer from './slice/catalogSlice';
import bookingReducer from './slice/bookingSlice';

const rootReducer = combineReducers({
    auth: authReducer,    
    catalog: catalogReducer, 
    booking: bookingReducer,
});

const store = configureStore({
    reducer: rootReducer,
    
});

export default store;