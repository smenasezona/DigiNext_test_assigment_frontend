    import {createSlice} from "@reduxjs/toolkit";

    const initialState = {
        isLoading: false
    }

    const createEntitySlice = createSlice({
        name: 'createEntity',
        initialState,
        reducers: {
            setIsCreating: (state, action) => {
                state.isLoading = action.payload
            }
        }
    })

    export const {setIsCreating} = createEntitySlice.actions
    export default createEntitySlice.reducer