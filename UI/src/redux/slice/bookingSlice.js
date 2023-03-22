import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from '../../utils/axios';
import Configuration from "../../configurations/Configuration";

const initialState = {
    isBookingLoading: false,   
    isBookingUpdated: false,
    isBookingDeleted: false,
    isBookingCreated: false,    
    status: null,
    errorMessage: null,
    bookings: null,
    updatedBookings: null,
    createdBookings: null,
    deletedBookings: null
}

export const getBookingsByUser = createAsyncThunk(
    'booking/getBookingsByUser',
    async ({id}) => {
        try {            
            const {data} = await axios.get(Configuration.GetBookingsByUser+`/${id}`)                       
            return {data};
        } catch (error) {    
            console.log(error)        
        }
    }
)

export const createBooking = createAsyncThunk(
    'booking/createBooking',
    async (item) =>{
        try {                       
            const {data} = await axios.post(Configuration.CreateBooking,item)                       
            return {data};
        } catch (error) {
            console.log(error)
        }
    }
)

export const updateBooking = createAsyncThunk(
    'booking/updateBooking',
    async (item) =>{
        try {            
            const {data} = await axios.put(Configuration.UpdateBooking,item)                       
            return {data};
        } catch (error) {
            console.log(error)
        }
    }
)

export const deleteBooking = createAsyncThunk(
    'booking/deleteBooking',
    async (id) =>{
        try {            
            const {data} = await axios.delete(Configuration.DeleteBooking+`/${id}`)                       
            return {data};
        } catch (error) {
            console.log(error)
        }
    }
)

export const getBookingsByWorkspace = createAsyncThunk(
    'booking/getBookingsByWorkspace',
    async (id) => {
        try {           
            const {data} = await axios.put(Configuration.GetBookingsByWorkspace+`/${id}`)                       
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
            state.isBookingLoading = true            
            //state.status = null
            //state.errorMessage = null
        },
        [getBookingsByUser.fulfilled]: (state, action) => {            
            state.isBookingLoading = false            
            //state.status = action.payload.status
            //state.errorMessage = action.payload.errors
            state.bookings = (action.payload)            
        },
        [getBookingsByUser.rejected]: (state, action) => {            
            state.isBookingLoading = false            
            state.status = action.payload.status
            state.errorMessage = action.payload.errors            
        },
        //----------------------------------------
        [getBookingsByWorkspace.pending]: (state) => {            
            state.isBookingLoading = true            
            //state.status = null
            //state.errorMessage = null
        },
        [getBookingsByWorkspace.fulfilled]: (state, action) => {            
            state.isBookingLoading = false            
            //state.status = action.payload.status
            //state.errorMessage = action.payload.errors
            state.bookings = (action.payload)            
        },
        [getBookingsByWorkspace.rejected]: (state, action) => {            
            state.isBookingLoading = false            
            state.status = action.payload.status
            state.errorMessage = action.payload.errors            
        },
        //----------------------------------------
        [createBooking.pending]: (state) => {            
            state.isBookingCreated = true            
            //state.status = null
            //state.errorMessage = null
        },
        [createBooking.fulfilled]: (state, action) => {            
            state.isBookingCreated = false            
            //state.status = action.payload.status
            //state.errorMessage = action.payload.errors
            state.createdBookings = action.payload            
        },
        [createBooking.rejected]: (state, action) => {            
            state.isBookingCreated = false            
            state.status = action.payload.status
            state.errorMessage = action.payload.errors            
        },
        //----------------------------------------
        [updateBooking.pending]: (state) => {            
            state.isBookingUpdated = true            
            //state.status = null
            //state.errorMessage = null
        },
        [updateBooking.fulfilled]: (state, action) => {            
            state.isBookingUpdated = false            
            //state.status = action.payload.status
            //state.errorMessage = action.payload.errors
            state.updatedBookings = action.payload            
        },
        [updateBooking.rejected]: (state, action) => {            
            state.isBookingUpdated = false            
            state.status = action.payload.status
            state.errorMessage = action.payload.errors            
        },
        //----------------------------------------
        [deleteBooking.pending]: (state) => {            
            state.isBookingDeleted = true            
            //state.status = null
            //state.errorMessage = null
        },
        [deleteBooking.fulfilled]: (state, action) => {            
            state.isBookingDeleted = false            
            //state.status = action.payload.status
            //state.errorMessage = action.payload.errors
            state.deletedBookings = action.payload            
        },
        [deleteBooking.rejected]: (state, action) => {            
            state.isBookingDeleted = false            
            state.status = action.payload.status
            state.errorMessage = action.payload.errors            
        },
    }
});

export const selectBookings = (state) => state.booking.bookings;

export const selectCreatedBookings = (state) => state.booking.createdBookings;

export const selectUpdatedBookings = (state) => state.booking.updatedBookings;

export const selectDeletedBookings = (state) => state.booking.deletedBookings;

export const selectIsBookingLoading = (state) => state.booking.isBookingLoading;

export const selectIsBookingUpdated = (state) => state.booking.isBookingUpdated;

export const selectIsBookingDeleted = (state) => state.booking.isBookingDeleted;


export default bookingSlice.reducer