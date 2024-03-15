import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isEditing: false
}

const editModalSlice = createSlice({
    name: 'editModal',
    initialState,
    reducers: {
        setIsEditing: (state, action) => {
            state.isEditing = action.payload
        }
    }
})

export const {setIsEditing} = editModalSlice.actions
export default editModalSlice.reducer