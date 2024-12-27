import { createAsyncThunk } from "@reduxjs/toolkit";

//Thunk nhận về keết quả tìm kiếm phòng
export const createTransaction = createAsyncThunk(
    "user/createTransaction",
    async (payload,{ rejectWithValue }) => {
        
        try {
              const response = await fetch("http://localhost:5000/api/client/transactions", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
              });
  
        // Kiểm tra nếu response không thành công
        if (!response.ok) {
          const errorData = await response.json();
          return rejectWithValue(errorData);
        }
        const data = await response.json();
        console.log(data);
        
        return data;
      } catch (error) {
        // Bắt lỗi bất ngờ (network errors, etc.)
        return rejectWithValue(error.message);
      }
    }
  );