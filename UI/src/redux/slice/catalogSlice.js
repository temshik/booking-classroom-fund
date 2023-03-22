import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from '../../utils/axios';
import Configuration from "../../configurations/Configuration";

const initialState = {
    isCategoryLoading: false,
    isCategoryUpdated: false,
    isCategoryDeleted: false,  
    isCategoryCreated: false,
    isWorkspaceLoading: false, 
    isWorkspaceUpdated: false,
    isWorkspaceCreated: false,
    isWorkspaceDeleted: false,
    status: null,
    errorMessage: null,
    totalPages: 0,
    categories: [],
    category: null,
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
            return {data};
        } catch (error) {
            console.log(error)
        }
    }
)

export const deleteWorkspace = createAsyncThunk(
    'catalog/deleteWorkspace',
    async (item) => {
        try {
            const {data} = await axios.delete(Configuration.DeleteWorkspace,{data:item})                       
            return {data};
        } catch (error) {
            console.log(error)
        }
    }
)

export const getWorkspacePaged = createAsyncThunk(
    'catalog/getWorkspacePaged',
    async ({PageSize,CurrentPage,SortOn,SortDirection, form}) => {
        try {            
            const {data} = await axios.post(Configuration.GetWorkspaciesPaged+`?PageSize=${PageSize}&CurrentPage=${CurrentPage}&SortOn=${SortOn}&SortDirection=${SortDirection}`, form)                       
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
            return {data};
        } catch (error) {
            console.log(error)
        }        
    }
)

export const createCategory = createAsyncThunk(
    'catalog/createCategory',
    async (item) => {
        try {
            const {data} = await axios.post(Configuration.CreateCategory,item)                     
            return {data};
        } catch (error) {
            console.log(error)
        }     
    }
)

export const deleteCategory = createAsyncThunk(
    'catalog/deleteCategory',
    async (id) => {
        try {
            const {data} = await axios.delete(Configuration.DeleteCategory+`/${id}`)                    
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
            state.isCategoryLoading = true            
            //state.status = null
            //state.errorMessage = null
        },
        [getCategory.fulfilled]: (state, action) => {            
            state.isCategoryLoading = false            
            //state.status = action.payload.status
            //state.errorMessage = action.payload.errors
            state.categories = (action.payload)            
        },
        [getCategory.rejected]: (state, action) => {            
            state.isCategoryLoading = false            
            state.status = action.payload.status
            state.errorMessage = action.payload.errors            
        },
        //----------------------------------------
        [getWorkspacePaged.pending]: (state) => {            
            state.isWorkspaceLoading = true            
            //state.status = null
            //state.errorMessage = null
        },
        [getWorkspacePaged.fulfilled]: (state, action) => {            
            state.isWorkspaceLoading = false            
            //state.status = action.payload.status
            //state.errorMessage = action.payload.errors
            state.workspacies = (action.payload.data.workspaceDTOs)
            state.totalPages = action.payload.data.totalPages            
        },
        [getWorkspacePaged.rejected]: (state, action) => {            
            state.isWorkspaceLoading = false            
            state.status = action.payload.status
            state.errorMessage = action.payload.errors            
        },      
        //----------------------------------------  
        [getWorkspace.pending]: (state) => {            
            state.isWorkspaceLoading = true            
            //state.status = null
            //state.errorMessage = null
        },
        [getWorkspace.fulfilled]: (state, action) => {            
            state.isWorkspaceLoading = false            
            //state.status = action.payload.status
            //state.errorMessage = action.payload.errors
            state.workspace = action.payload            
        },
        [getWorkspace.rejected]: (state, action) => {            
            state.isWorkspaceLoading = false            
            state.status = action.payload.status
            state.errorMessage = action.payload.errors            
        },
        //----------------------------------------
        [updateCategory.pending]: (state) => {            
            state.isCategoryUpdated = true            
            //state.status = null
            //state.errorMessage = null
        },
        [updateCategory.fulfilled]: (state, action) => {            
            state.isCategoryUpdated = false            
            //state.status = action.payload.status
            //state.errorMessage = action.payload.errors
            state.updatedCategoty = action.payload
        },
        [updateCategory.rejected]: (state, action) => {            
            state.isCategoryUpdated = false            
            state.status = action.payload.status
            state.errorMessage = action.payload.errors            
        },
        [createCategory.pending]: (state) => {            
            state.isCategoryCreated = true            
            //state.status = null
            //state.errorMessage = null
        },
        [createCategory.fulfilled]: (state, action) => {            
            state.isCategoryCreated = false            
            //state.status = action.payload.status
            //state.errorMessage = action.payload.errors
            state.category = action.payload
        },
        [createCategory.rejected]: (state, action) => {            
            state.isCategoryCreated = false            
            state.status = action.payload.status
            state.errorMessage = action.payload.errors            
        },
        [deleteCategory.pending]: (state) => {            
            state.isCategoryDeleted = true            
            //state.status = null
            //state.errorMessage = null
        },
        [deleteCategory.fulfilled]: (state, action) => {            
            state.isCategoryDeleted = false            
            //state.status = action.payload.status
            //state.errorMessage = action.payload.errors
            state.category = action.payload
        },
        [deleteCategory.rejected]: (state, action) => {            
            state.isCategoryDeleted = false            
            state.status = action.payload.status
            state.errorMessage = action.payload.errors            
        },
        //----------------------------------------
        [updateWorkspace.pending]: (state) => {            
            state.isWorkspaceLoading = true            
            //state.status = null
            //state.errorMessage = null
        },
        [updateWorkspace.fulfilled]: (state, action) => {            
            state.isWorkspaceLoading = false            
            //state.status = action.payload.status
            //state.errorMessage = action.payload.errors
            state.updatedWorkspace = action.payload
            state.isWorkspaceUpdated = true
        },
        [updateWorkspace.rejected]: (state, action) => {            
            state.isWorkspaceLoading = false            
            state.status = action.payload.status
            state.errorMessage = action.payload.errors            
        },
        //----------------------------------------
        [createWorkspace.pending]: (state) => {            
            state.isWorkspaceLoading = true            
            //state.status = null
            //state.errorMessage = null
        },
        [createWorkspace.fulfilled]: (state, action) => {            
            state.isWorkspaceLoading = false            
            //state.status = action.payload.status
            //state.errorMessage = action.payload.errors
            state.updatedWorkspace = action.payload
            state.isWorkspaceCreated = true
        },
        [createWorkspace.rejected]: (state, action) => {            
            state.isWorkspaceLoading = false            
            state.status = action.payload.status
            state.errorMessage = action.payload.errors            
        },
        //----------------------------------------
        [deleteWorkspace.pending]: (state) => {            
            state.isWorkspaceLoading = true            
            //state.status = null
            //state.errorMessage = null
        },
        [deleteWorkspace.fulfilled]: (state, action) => {            
            state.isWorkspaceLoading = false            
            //state.status = action.payload.status
            //state.errorMessage = action.payload.errors
            state.updatedWorkspace = action.payload
            state.isWorkspaceDeleted = action.payload !== null ? true : false
        },
        [deleteWorkspace.rejected]: (state, action) => {            
            state.isWorkspaceLoading = false            
            state.status = action.payload.status
            state.errorMessage = action.payload.errors            
        },
    }
});

export const selectCat = (state) => state.catalog.categories;

export const selectCategory = (state) => state.catalog.category;

export const updatedCat = (state) => state.catalog.updatedCategoty

export const selectWorkspacePaged = (state) => state.catalog.workspacies;

export const selectWorkspace = (state) => state.catalog.workspace;

export const selectTotalPages = (state) => state.catalog.totalPages;

export const selectIsCategoryLoading = (state) => state.catalog.isCategoryLoading;

export const selectIsCategoryCreated = (state) => state.catalog.isCategoryCreated;

export const selectIsCategoryDeleted = (state) => state.catalog.isCategoryDeleted;

export const selectIsCategoryUpdated = (state) => state.catalog.isCategoryUpdated;

export const selectIsWorkspaceLoading = (state) => state.catalog.isWorkspaceLoading;

export const selectUpdatedWorkspace = (state) => state.catalog.updateWorkspace;

export const selectIsWorkspaceCreated = (state) => state.catalog.isWorkspaceCreated;

export const selectIsWorkspaceUpdated = (state) => state.catalog.isWorkspaceUpdated;

export const selectIsWorkspaceDeleted = (state) => state.catalog.isWorkspaceDeleted;

export default catalogSlice.reducer