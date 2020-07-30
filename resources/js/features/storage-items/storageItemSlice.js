import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {client} from "../../utils/api";

export const fetchStorageItemsByStorageId = createAsyncThunk(
    'storageItems/fetchByStorageId',
    async (storageId, {getState, requestId}) => {
        const {currentRequestId, loading} = getState().storageItems
        if (loading !== 'pending' || requestId !== currentRequestId) {
            return
        }

        const response = await client(`storage-item/${storageId}`)
        return response.data
    }
)

export const createStorageItem = createAsyncThunk(
    'storageItems/create',
    async ({id, name, qty, storageId}, {getState, dispatch, requestId, signal}) => {
        const {currentRequestId, loading} = getState().storageItems.localData.find(storageItem => storageItem.id === id);

        if (loading !== 'pending' || requestId !== currentRequestId) {
            return
        }

        const response = await client(`storage-item`, {
            method: 'POST',
            body: {
                name: name,
                qty: qty,
                storage_id: storageId
            },
        })

        const promise = dispatch(fetchStorageItemsByStorageId(storageId));

        signal.addEventListener('abort', () => {
            promise.abort()
        });

        return response.success
    }
)

const initialState = {
    loading: 'idle',
    currentRequestId: undefined,
    localData: [],
    data: [],
    storageId: '',
}

export const storageItemsSlice = createSlice({
        name: 'storageItems',
        initialState,
        reducers: {
            clearData(state) {
                return initialState;
            },
            addEmpty(state, action) {
                state.localData.push({
                    id: new Date().getTime(),
                    loading: 'idle',
                    saved: false,
                })
            },
            removeEmpty(state, action) {
                state.localData = state.localData.filter(storageItem => storageItem.id !== action.payload)
            },
        },
        extraReducers: {
            [createStorageItem.pending]: (state, action) => {
                const storageItem = state.localData.find(storageItem => storageItem.id === action.meta.arg.id)

                if (storageItem.loading === 'idle') {
                    storageItem.loading = 'pending'
                    storageItem.currentRequestId = action.meta.requestId
                }
            },
            [createStorageItem.fulfilled]: (state, action) => {
                const storageItem = state.localData.find(storageItem => storageItem.id === action.meta.arg.id);
                storageItem.saved = true;
            },
            [createStorageItem.rejected]: (state, action) => {
                const storageItem = state.localData.find(storageItem => storageItem.id === action.meta.arg.id);
                const {requestId} = action.meta
                if (storageItem.loading === 'pending' && state.currentRequestId === requestId) {
                    storageItem.loading = 'idle'
                    storageItem.error = action.error
                    storageItem.currentRequestId = undefined
                }
            },
            [fetchStorageItemsByStorageId.pending]: (state, action) => {
                if (state.loading === 'idle') {
                    state.loading = 'pending'
                    state.currentRequestId = action.meta.requestId
                }
            },
            [fetchStorageItemsByStorageId.fulfilled]: (state, action) => {
                const {requestId} = action.meta
                if (state.loading === 'pending' && state.currentRequestId === requestId) {
                    state.loading = 'idle'
                    state.data = action.payload
                    state.currentRequestId = undefined
                }
            },
            [fetchStorageItemsByStorageId.rejected]: (state, action) => {
                const {requestId} = action.meta
                if (state.loading === 'pending' && state.currentRequestId === requestId) {
                    state.loading = 'idle'
                    state.error = action.error
                    state.currentRequestId = undefined
                }
            }
        }
    }
)

export const {addEmpty, clearData, removeEmpty} = storageItemsSlice.actions
