import { createAsyncThunk } from "@reduxjs/toolkit";

//Thunk nhận về keết quả tìm kiếm phòng
export const getTransactionsByUserId = createAsyncThunk(
    "user/getTransactionsByUserId",
    async (userId,{ rejectWithValue }) => {
        
        try {
              const response = await fetch(`https://booking-app-backend-134f.onrender.com/api/client/transactions/by-user/?userId=${userId}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              });
  
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