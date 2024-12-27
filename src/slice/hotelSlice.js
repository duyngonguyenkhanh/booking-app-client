import { createSlice } from "@reduxjs/toolkit";
import { SearchApi } from "./thunk/SearchApi";
import { RoomApi } from "./thunk/roomApi";
import { getAvailableRooms } from "./thunk/getAvailableRooms";
const hotelSlice = createSlice({
  name: "hotel",
  initialState: {
    res: JSON.parse(localStorage.getItem("hotels")) || null,
    err: null,
    status: "idle",
    hotel: JSON.parse(localStorage.getItem("hotel")) || null, // Lấy từ localStorage nếu có
    reserve: JSON.parse(localStorage.getItem("reserve")) || null, // Lấy từ localStorage nếu có
    rooms: JSON.parse(localStorage.getItem("reserve")) || null,
  },
  reducers: {
    setReserve: (state, action) => {
      state.reserve = action.payload;
      localStorage.setItem("reserve", JSON.stringify(action.payload)); // Lưu vào localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      //Case tim khach san
      .addCase(SearchApi.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(SearchApi.fulfilled, (state, action) => {
        state.status = "SUCCESSFULL";
        state.res = action.payload;
        localStorage.setItem("hotels", JSON.stringify(action.payload));
      })
      .addCase(SearchApi.rejected, (state, action) => {
        state.status = "failded";
        state.error = action.payload;
      })


      //Case tim phong
      .addCase(RoomApi.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(RoomApi.fulfilled, (state, action) => {
        state.status = "SUCCESSFULL";
        state.hotel = action.payload;
        localStorage.setItem("hotel", JSON.stringify(action.payload)); // Lưu vào localStorage
      })
      .addCase(RoomApi.rejected, (state, action) => {
        state.status = "failded";
        state.error = action.payload;
      })


      //Case tim phong trong
      .addCase(getAvailableRooms.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(getAvailableRooms.fulfilled, (state, action) => {
        state.status = "SUCCESSFULL";
        state.rooms = action.payload;
        localStorage.setItem("roons", JSON.stringify(action.payload)); // Lưu vào localStorage
      })
      .addCase(getAvailableRooms.rejected, (state, action) => {
        state.status = "failded";
        state.error = action.payload;
      });
      
  },
});

export const { setReserve } = hotelSlice.actions;
export default hotelSlice.reducer;
