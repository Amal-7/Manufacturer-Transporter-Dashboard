import { createSlice } from "@reduxjs/toolkit";

const manufacturerSlice = createSlice({
    name : 'manufacturer' ,

    initialState : {
        user : null,
        isLoggedIn : false
    },

    reducers : {
        login : (state, action ) => {
            state.user = action.payload,
            state.isLoggedIn =true
        }  ,
        logout : (state) => {
            state.user = null
            state.isLoggedIn = false
        }
    
    }
})


export default manufacturerSlice.reducer
export const {login ,logout}  = manufacturerSlice.actions