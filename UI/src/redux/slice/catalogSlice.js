import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import CatalogServices from "../../services/CatalogServices";
import axios from '../../utils/axios';
import Configuration from "../../configurations/Configuration";
import ErrorHandler from '../../modules/ErrorHandler';

const errorHandler = new ErrorHandler();

const initialState = {
    isLoading: false,    
    status: null,
    errorMessage: null,
    totalPages: 0,
    categories: [],
    workspacies: [],
    updatedCategoty: null
}

export const getCategory = createAsyncThunk(
    'catalog/getCategory',
    async () => {
        try {
            const {data} = await axios.get(Configuration.GetCategories)
            console.log("getcategor", data);            
            return {data};
        } catch (error) {
            console.log(error)
        }
    }
)

export const getWorkspacePaged = createAsyncThunk(
    'catalog/getWorkspacePaged',
    async ({PageSize,CurrentPage,SortOn,SortDirection}) => {
        try {
            const {data} = await axios.get(Configuration.GetWorkspaciesPaged+`?PageSize=${PageSize}&CurrentPage=${CurrentPage}&SortOn=${SortOn}&SortDirection=${SortDirection}`)
            console.log("getWorkspacePaged", data);            
            return {data};
        } catch (error) {
            console.log(error)
        }
    }
)

export const updateCategory = createAsyncThunk(
    'catalog/updateCategory',
    async (item) => {
        try {
            const {data} = await axios.put(Configuration.UpdateCategory,item)
            console.log("updateCategory", data);            
            return {data};
        } catch (error) {
            console.log(error)
        }        
    }
)

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {},
    extraReducers: {
        [getCategory.pending]: (state) => {
            console.log('a')
            state.isLoading = true            
            //state.status = null
            //state.errorMessage = null
        },
        [getCategory.fulfilled]: (state, action) => {
            console.log('b')
            state.isLoading = false            
            //state.status = action.payload.status
            //state.errorMessage = action.payload.errors
            state.categories = (action.payload)
            console.log("categories",state.categories)
        },
        [getCategory.rejected]: (state, action) => {
            console.log('c')
            state.isLoading = false            
            state.status = action.payload.status
            state.errorMessage = action.payload.errors            
        },
        [getWorkspacePaged.pending]: (state) => {
            console.log('a')
            state.isLoading = true            
            //state.status = null
            //state.errorMessage = null
        },
        [getWorkspacePaged.fulfilled]: (state, action) => {
            console.log('b')
            state.isLoading = false            
            //state.status = action.payload.status
            //state.errorMessage = action.payload.errors
            state.workspacies = (action.payload.data.workspaceDTOs)
            state.totalPages = action.payload.data.totalPages
            console.log("workspacies",state.workspacies)
        },
        [getWorkspacePaged.rejected]: (state, action) => {
            console.log('c')
            state.isLoading = false            
            state.status = action.payload.status
            state.errorMessage = action.payload.errors            
        },
        [updateCategory.pending]: (state) => {
            console.log('a')
            state.isLoading = true            
            //state.status = null
            //state.errorMessage = null
        },
        [updateCategory.fulfilled]: (state, action) => {
            console.log('b')
            state.isLoading = false            
            //state.status = action.payload.status
            //state.errorMessage = action.payload.errors
            state.updatedCategoty = action.payload
        },
        [updateCategory.rejected]: (state, action) => {
            console.log('c')
            state.isLoading = false            
            state.status = action.payload.status
            state.errorMessage = action.payload.errors            
        },
    }
});

export const selectCat = (state) => state.catalog.categories;

export const updatedCat = (state) => state.catalog.updatedCategoty

export const selectWorkspacePaged = (state) => state.catalog.workspacies;

export const selectTotalPages = (state) => state.catalog.totalPages;

export default catalogSlice.reducer