import { createAsyncThunk } from "@reduxjs/toolkit";

//Thunk nhận về Homepage
export const Homepage = createAsyncThunk(
    "user/Homepage",
    async (_,{ rejectWithValue }) => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/client/hotels`,  {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
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