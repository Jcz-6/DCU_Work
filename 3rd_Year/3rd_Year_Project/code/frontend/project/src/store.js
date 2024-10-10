import rootReducer from './reducers';
//import * as toolkitRaw from '@reduxjs/toolkit';
import { configureStore } from "@reduxjs/toolkit";
//import { buildGetDefaultMiddleware } from "@reduxjs/toolkit";

//const { buildGetDefaultMiddleware } = toolkitRaw.default ?? toolkitRaw;
//const { configureStore } = toolkitRaw.default ?? toolkitRaw;

const intialState = {};

const store = configureStore({
    reducer: rootReducer,
    preloadedState: intialState,
})

export default store;