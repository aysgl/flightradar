import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const options = {
    method: 'GET',
    url: 'https://flight-radar1.p.rapidapi.com/flights/list-in-boundary',
    params: {
        bl_lat: '31.410714',
        bl_lng: '24.990753',
        tr_lat: '46.268482',
        tr_lng: '53.37673',
        limit: '300'
    },
    headers: {
        'X-RapidAPI-Key': '2ce9f4145dmsh9f6590a80474c79p13043cjsn30072b620355',
        'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
    }
};

const detail = {
    headers: {
        'X-RapidAPI-Key': '2ce9f4145dmsh9f6590a80474c79p13043cjsn30072b620355',
        'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
    }
};

export const getFlights = createAsyncThunk("flight/getFlights", async () => {
    const res = await axios.request(options)

    const data = res.data.aircraft.map(i => ({
        id: i[0],
        code: i[1],
        lat: i[2],
        lng: i[3],
        rotation: i[4]
    }))

    return data
})

export const getDetails = createAsyncThunk("flight/getDetails", async (id) => {
    const res = await axios.get(`https://flight-radar1.p.rapidapi.com/flights/detail?flight=${id}`, detail)
    return res.data
})