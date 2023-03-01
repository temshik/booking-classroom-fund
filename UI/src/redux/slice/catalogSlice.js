import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import CatalogServices from "../../services/CatalogServices";
import axios from '../../utils/axios';
import Configuration from "../../configurations/Configuration";
import ErrorHandler from '../../modules/ErrorHandler';

const errorHandler = new ErrorHandler();

const initialState = {
    isCategoryLoading: false,   
    isWorkspaceLoading: false, 
    status: null,
    errorMessage: null,
    totalPages: 0,
    categories: [],
    workspacies: [],
    workspace:[],
    updatedCategoty: null,
    updatedWorkspace: null
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

export const getWorkspace = createAsyncThunk(
    'catalog/getWorkspace',
    async ({id}) => {
        try {
            const {data} = await axios.get(Configuration.GetWorkspace+`/${id}`)
            console.log("getWorkspace", data);            
            return {data};
        } catch (error) {
            console.log(error)
        }
    }
)

export const createWorkspace = createAsyncThunk(
    'catalog/createWorkspace',
    async (item) => {
        try {
            const {data} = await axios.post(Configuration.CreateWorkspace,item)
            console.log("createWorkspace", data);            
            return {data};
        } catch (error) {
            console.log(error)
        }
    }
)

export const updateWorkspace = createAsyncThunk(
    'catalog/updateWorkspace',
    async (item) => {
        try {
            const {data} = await axios.put(Configuration.UpdateWorkspace,item)
            console.log("updateWorkspace", data);            
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
            state.isCategoryLoading = true            
            //state.status = null
            //state.errorMessage = null
        },
        [getCategory.fulfilled]: (state, action) => {
            console.log('b')
            state.isCategoryLoading = false            
            //state.status = action.payload.status
            //state.errorMessage = action.payload.errors
            state.categories = (action.payload)
            console.log("categories",state.categories)
        },
        [getCategory.rejected]: (state, action) => {
            console.log('c')
            state.isCategoryLoading = false            
            state.status = action.payload.status
            state.errorMessage = action.payload.errors            
        },
        //----------------------------------------
        [getWorkspacePaged.pending]: (state) => {
            console.log('a')
            state.isWorkspaceLoading = true            
            //state.status = null
            //state.errorMessage = null
        },
        [getWorkspacePaged.fulfilled]: (state, action) => {
            console.log('b')
            state.isWorkspaceLoading = false            
            //state.status = action.payload.status
            //state.errorMessage = action.payload.errors
            state.workspacies = (action.payload.data.workspaceDTOs)
            state.totalPages = action.payload.data.totalPages
            console.log("workspacies",state.workspacies)
        },
        [getWorkspacePaged.rejected]: (state, action) => {
            console.log('c')
            state.isWorkspaceLoading = false            
            state.status = action.payload.status
            state.errorMessage = action.payload.errors            
        },      
        //----------------------------------------  
        [getWorkspace.pending]: (state) => {
            console.log('a')
            state.isWorkspaceLoading = true            
            //state.status = null
            //state.errorMessage = null
        },
        [getWorkspace.fulfilled]: (state, action) => {
            console.log('b')
            state.isWorkspaceLoading = false            
            //state.status = action.payload.status
            //state.errorMessage = action.payload.errors
            state.workspace = action.payload
            console.log("workspace",state.workspace)
        },
        [getWorkspace.rejected]: (state, action) => {
            console.log('c')
            state.isWorkspaceLoading = false            
            state.status = action.payload.status
            state.errorMessage = action.payload.errors            
        },
        //----------------------------------------
        [updateCategory.pending]: (state) => {
            console.log('a')
            state.isCategoryLoading = true            
            //state.status = null
            //state.errorMessage = null
        },
        [updateCategory.fulfilled]: (state, action) => {
            console.log('b')
            state.isCategoryLoading = false            
            //state.status = action.payload.status
            //state.errorMessage = action.payload.errors
            state.updatedCategoty = action.payload
        },
        [updateCategory.rejected]: (state, action) => {
            console.log('c')
            state.isCategoryLoading = false            
            state.status = action.payload.status
            state.errorMessage = action.payload.errors            
        },
        //----------------------------------------
        [updateWorkspace.pending]: (state) => {
            console.log('a')
            state.isWorkspaceLoading = true            
            //state.status = null
            //state.errorMessage = null
        },
        [updateWorkspace.fulfilled]: (state, action) => {
            console.log('b')
            state.isWorkspaceLoading = false            
            //state.status = action.payload.status
            //state.errorMessage = action.payload.errors
            state.updatedWorkspace = action.payload
        },
        [updateWorkspace.rejected]: (state, action) => {
            console.log('c')
            state.isWorkspaceLoading = false            
            state.status = action.payload.status
            state.errorMessage = action.payload.errors            
        },
        //----------------------------------------
        [createWorkspace.pending]: (state) => {
            console.log('a')
            state.isWorkspaceLoading = true            
            //state.status = null
            //state.errorMessage = null
        },
        [createWorkspace.fulfilled]: (state, action) => {
            console.log('b')
            state.isWorkspaceLoading = false            
            //state.status = action.payload.status
            //state.errorMessage = action.payload.errors
            state.updatedWorkspace = action.payload
        },
        [createWorkspace.rejected]: (state, action) => {
            console.log('c')
            state.isWorkspaceLoading = false            
            state.status = action.payload.status
            state.errorMessage = action.payload.errors            
        },
    }
});

export const selectCat = (state) => state.catalog.categories;

export const updatedCat = (state) => state.catalog.updatedCategoty

export const selectWorkspacePaged = (state) => state.catalog.workspacies;

export const selectWorkspace = (state) => state.catalog.workspace;

export const selectTotalPages = (state) => state.catalog.totalPages;

export const selectIsCategoryLoading = (state) => state.catalog.isCategoryLoading;

export const selectIsWorkspaceLoading = (state) => state.catalog.isWorkspaceLoading;

export default catalogSlice.reducer