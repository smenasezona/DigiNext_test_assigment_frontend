import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isOpen: false
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setIsModalOpen: (state, action) => {
            state.isOpen = action.payload
        }
    }
})

export const {setIsModalOpen} = modalSlice.actions
export default modalSlice.reducer