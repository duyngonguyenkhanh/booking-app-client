import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slice/userSlice";
import hotelSlice from "../slice/hotelSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        hotel: hotelSlice,
    }
})