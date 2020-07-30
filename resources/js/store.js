import {configureStore} from '@reduxjs/toolkit';
import {storageItemsSlice} from './features/storage-items/storageItemSlice';

const store = configureStore({
    reducer: {
        storageItems: storageItemsSlice.reducer,
    },
})

export default store;
