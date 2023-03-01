import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import CatalogServices from "../../services/CatalogServices";
import axios from '../../utils/axios';
import Configuration from "../../configurations/Configuration";
import ErrorHandler from '../../modules/ErrorHandler';

const initialState = {
    isLoading: false,       
}

export const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {},
    extraReducers: {}
})

export default bookingSlice.reducer