import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from '../../utils/axios';
import Configuration from "../../configurations/Configuration";
import ErrorHandler from '../../modules/ErrorHandler';

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
            console.log({id})
            const {data} = await axios.get(Configuration.GetBookingsByUser+`/${id}`)
            console.log("getBookings", data);            
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
            console.log("createBooking", item); 
            const {data} = await axios.post(Configuration.CreateBooking,item)
            //console.log("createBooking", data);            
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
            console.log(id)
            const {data} = await axios.put(Configuration.GetBookingsByWorkspace+`/${id}`)
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
        [getBookingsByWorkspace.pending]: (state) => {
            console.log('a')
            state.isBookingLoading = true            
            //state.status = null
            //state.errorMessage = null
        },
        [getBookingsByWorkspace.fulfilled]: (state, action) => {
            console.log('b')
            state.isBookingLoading = false            
            //state.status = action.payload.status
            //state.errorMessage = action.payload.errors
            state.bookings = (action.payload)
            console.log("bookings",state.bookings)
        },
        [getBookingsByWorkspace.rejected]: (state, action) => {
            console.log('c')
            state.isBookingLoading = false            
            state.status = action.payload.status
            state.errorMessage = action.payload.errors            
        },
        //----------------------------------------
        [createBooking.pending]: (state) => {
            console.log('a')
            state.isBookingCreated = true            
            //state.status = null
            //state.errorMessage = null
        },
        [createBooking.fulfilled]: (state, action) => {
            console.log('b')
            state.isBookingCreated = false            
            //state.status = action.payload.status
            //state.errorMessage = action.payload.errors
            state.createdBookings = action.payload
            console.log("bookings",state.createdBookings)
        },
        [createBooking.rejected]: (state, action) => {
            console.log('c')
            state.isBookingCreated = false            
            state.status = action.payload.status
            state.errorMessage = action.payload.errors            
        },
        //----------------------------------------
        [updateBooking.pending]: (state) => {
            console.log('a')
            state.isBookingUpdated = true            
            //state.status = null
            //state.errorMessage = null
        },
        [updateBooking.fulfilled]: (state, action) => {
            console.log('b')
            state.isBookingUpdated = false            
            //state.status = action.payload.status
            //state.errorMessage = action.payload.errors
            state.updatedBookings = action.payload
            console.log("bookings",state.bookings)
        },
        [updateBooking.rejected]: (state, action) => {
            console.log('c')
            state.isBookingUpdated = false            
            state.status = action.payload.status
            state.errorMessage = action.payload.errors            
        },
        //----------------------------------------
        [deleteBooking.pending]: (state) => {
            console.log('a')
            state.isBookingDeleted = true            
            //state.status = null
            //state.errorMessage = null
        },
        [deleteBooking.fulfilled]: (state, action) => {
            console.log('b')
            state.isBookingDeleted = false            
            //state.status = action.payload.status
            //state.errorMessage = action.payload.errors
            state.deletedBookings = action.payload
            console.log("bookings",state.deletedBookings)
        },
        [deleteBooking.rejected]: (state, action) => {
            console.log('c')
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


export default bookingSlice.reducer