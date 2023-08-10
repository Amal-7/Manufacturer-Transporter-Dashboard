// rootReducer.js

import { combineReducers } from '@reduxjs/toolkit';
import transporterSlice from './transporterSlice.js'
import manufacturerSlice from './manufacturerSlice.js'
import orderSlice from './orderSlice.js';

const rootReducer = combineReducers({
    transporter : transporterSlice ,
    manufacturer : manufacturerSlice,
    orders : orderSlice,
});

export default rootReducer;
