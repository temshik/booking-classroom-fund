import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from '../../utils/axios';
import Configuration from "../../configurations/Configuration";
import ErrorHandler from '../../modules/ErrorHandler';

const initialState = {
    isBookingLoading: false,   
    isBookingUpdated: false,
    isBookingCreated: false,    
    status: null,
    errorMessage: null,
    bookings: [],
    updatedBookings: null
}

export const getBookingsByUser = createAsyncThunk(
    'booking/getBookingsByUser',
    async ({id}) => {
        try {
            const {data} = await axios.get(Configuration.GetBookingsByUser+`/${id}`)
            console.log("getBookings", data);            
            return {data};
        } catch (error) {
            console.log(error)
        }
    }
)

export const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {},
    extraReducers: {
        [getBookingsByUser.pending]: (state) => {
            console.log('a')
            state.isBookingLoading = true            
            //state.status = null
            //state.errorMessage = null
        },
        [getBookingsByUser.fulfilled]: (state, action) => {
            console.log('b')
            state.isBookingLoading = false            
            //state.status = action.payload.status
            //state.errorMessage = action.payload.errors
            state.bookings = (action.payload)
            console.log("bookings",state.bookings)
        },
        [getBookingsByUser.rejected]: (state, action) => {
            console.log('c')
            state.isBookingLoading = false            
            state.status = action.payload.status
            state.errorMessage = action.payload.errors            
        },
        //----------------------------------------
    }
});

export const selectBookings = (state) => state.booking.bookings;

export default bookingSlice.reducer