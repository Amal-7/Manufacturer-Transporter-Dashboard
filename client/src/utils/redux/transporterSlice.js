import {createSlice} from '@reduxjs/toolkit'

const transporterSlice = createSlice({
    name : 'transporter',
    initialState : {
        user : null,
        isLoggedIn : false
    },
    reducers : {
        login : (state,action) => {
            state.user= action.payload,
            state.isLoggedIn = true
        },
        logout : (state) => {
            state.user = null,
            state.isLoggedIn = false
        }
    }
})

export default transporterSlice.reducer
export const {login,logout} = transporterSlice.actions