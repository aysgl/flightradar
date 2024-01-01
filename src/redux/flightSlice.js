import { createSlice } from "@reduxjs/toolkit";
import { getDetails, getFlights } from "./flightAction";

const flightSlice = createSlice({
    name: "flight",
    initialState: {
        isLoading: false,
        isError: false,
        flights: [],
        details: ""
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFlights.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFlights.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(getFlights.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.flights = action.payload;
            })
            .addCase(getDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDetails.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(getDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.details = action.payload;
            })
    }
})

export default flightSlice.reducer;