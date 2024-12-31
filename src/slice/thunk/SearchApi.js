import { createAsyncThunk } from "@reduxjs/toolkit";

//Thunk nhận về keết quả tìm kiếm phòng
export const SearchApi = createAsyncThunk(
    "user/SearchApi",
    async (searchOb,{ rejectWithValue }) => {
      try {
        const response = await fetch(
          `https://booking-app-backend-134f.onrender.com/api/client/hotels/search?city=${searchOb.where}&dateStart=${searchOb.start}&dateEnd=${searchOb.end}&numberOfPeople=${searchOb.numberOfPeple}&numberOfRooms=${searchOb.numberOfRoom}`,  {
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
        console.log(data);
        
        return data;
      } catch (error) {
        // Bắt lỗi bất ngờ (network errors, etc.)
        return rejectWithValue(error.message);
      }
    }
  );