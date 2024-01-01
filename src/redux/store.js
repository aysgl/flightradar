import { configureStore } from "@reduxjs/toolkit";
import flightSlice from "./flightSlice";

const store = configureStore({
    reducer: {
        flight: flightSlice,
    }
});

export default store;