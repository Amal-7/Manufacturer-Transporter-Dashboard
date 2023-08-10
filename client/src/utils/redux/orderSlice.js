import {  createSlice } from "@reduxjs/toolkit";


const orderSlice = createSlice({
    name : 'orders',
    initialState : {
        manufacturer : [],
        transporter : []
    },

    reducers : {
        orderListManufacturer : (state,action) => {
            state.manufacturer = action.payload
        },
        orderListTransporter :(state,action) => {
          state.transporter =action.payload
        },
        deleteOrdersManufacturer : (state) => {
            state.manufacturer = []
        },
        deleteOrdersTransporter : (state) => {
            state.transporter = []
        }
    }
})

export default orderSlice.reducer
export const {orderListManufacturer,orderListTransporter,deleteOrdersManufacturer,deleteOrdersTransporter} =  orderSlice.actions
