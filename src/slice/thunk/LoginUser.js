import { createAsyncThunk } from "@reduxjs/toolkit";

//Hàm post Login
export const LoginUser = createAsyncThunk(
    "user/Login",
    async (userData, { rejectWithValue }) => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/client/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        );
  
        // Kiểm tra nếu response không thành công
        if (!response.ok) {
          const errorData = await response.json();
          return rejectWithValue(errorData);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        // Bắt lỗi bất ngờ (network errors, etc.)
        return rejectWithValue(error.message);
      }
    }
  );