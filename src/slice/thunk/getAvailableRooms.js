import { createAsyncThunk } from "@reduxjs/toolkit";

//Thunk nhận về keết quả tìm kiếm phòng
export const getAvailableRooms = createAsyncThunk(
  "user/getAvailableRooms",
  async (AvailableRooms, { rejectWithValue }) => {

    try {
      const response = await fetch(
        `http://localhost:5000/api/client/rooms/available?roomIds=${AvailableRooms.ids}&dateStart=${AvailableRooms.start}&dateEnd=${AvailableRooms.end}
`,
        {
          method: "POST",
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
