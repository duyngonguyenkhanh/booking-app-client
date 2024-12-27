import { createSlice } from "@reduxjs/toolkit";
import { createTransaction } from "./thunk/createTransaction";
import { RegisterUser } from "./thunk/RegisterUser";
import { LoginUser } from "./thunk/LoginUser";
import { Homepage } from "./thunk/Homepage";
import { decodeToken } from "../utils/decodeToken";
import { getTransactionsByUserId } from "./thunk/getTransactionsByUserId";

const initialState = {
  res: null,
  error: null,
  status: null,
  isSuccess: false,
  users: [],
  token: localStorage.getItem('token') || null,
  hotels: [],
  statusTrans: false,
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null, // Lấy thông tin người dùng từ localStorage
  transaction: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    setTokenFromLocalStorage: (state) => {
      const token = localStorage.getItem('token');
      if (token) {
        state.token = token;
        const decodedUser = decodeToken(token); // Giải mã token và lưu trữ thông tin người dùng
        state.user = decodedUser;
        localStorage.setItem('user', JSON.stringify(decodedUser)); // Lưu thông tin người dùng vào localStorage
      }
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload; // Lưu trữ thông tin người dùng đã giải mã
    },
    reset: (state) => {
       state. res = null;
       state. error = null;
       state. status = null;
  
    },
    resetSuccess(state) {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.status = "successful";
        state.res = action.payload;
        state.isSuccess = true;
        state.error = null;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(LoginUser.pending, (state) => {
        state.res = null;
        state.error = null;
        state.status = 'loading';
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.res = action.payload;
        state.error = null;
        state.status = 'successful';
        state.token = action.payload.token;
        state.isSuccess = true;
        localStorage.setItem('token', action.payload.token);

        // Giải mã token và lưu thông tin người dùng
        const decodedUser = decodeToken(action.payload.token);
        state.user = decodedUser;
        localStorage.setItem('user', JSON.stringify(decodedUser)); // Lưu thông tin người dùng vào localStorage
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.res = null;
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(Homepage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(Homepage.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.hotels = action.payload;
        state.error = null;
      })
      .addCase(Homepage.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(createTransaction.pending, (state) => {
        state.statusTrans = true;
      })
      .addCase(createTransaction.fulfilled, (state) => {
        state.statusTrans = false;
        state.isSuccess = true
        state.error = null;
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.statusTrans = false;
        state.error = action.payload;
      })
      //Nhận all giao dịch của 1 user
      .addCase(getTransactionsByUserId.pending, (state) => {
        state.statusTrans = "loading";
      })
      .addCase(getTransactionsByUserId.fulfilled, (state,action) => {
        state.statusTrans = "fulfilled";
        state.transaction = action.payload;
        state.error = null;
      })
      .addCase(getTransactionsByUserId.rejected, (state, action) => {
        state.statusTrans = "rejected";
        state.error = action.payload;
      })
  },
});

export const { logout, setTokenFromLocalStorage, setToken, reset, resetSuccess } = userSlice.actions;
export default userSlice.reducer;
