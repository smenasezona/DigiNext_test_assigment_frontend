import {configureStore} from '@reduxjs/toolkit';
import modalReducer from './slices/modalSlice.js';
import createEntityReducer from './slices/createEntitySlice.js';
import editModalReducer from './slices/editModalSlice.js';
import {api} from "./apiQueries.js";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        modal: modalReducer,
        createEntity: createEntityReducer,
        editModal: editModalReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});



