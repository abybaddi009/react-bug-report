import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUserLocation } from './UserLocationAPI';

const initialState = {
  data: {
    position: { latitude: 19.0825223, longitude: 72.7411018, altitude: 14 },
    owners: [
      {
        id: 1,
        name: 'Unisex salon',
        position: [Math.random()+35, Math.random()+95],
        address: '',
      },
      {
        id: 2,
        name: 'Simon Salon',
        position: [Math.random()+35, Math.random()+95],
        address: '',
      },
    ],
  },
  status: 'idle',
};

export const fetchUserLocationAsync = createAsyncThunk('userLocation/fetchUserLocation', async () => {
  const response = await fetchUserLocation();
  return response;
});

export const userLocationSlice = createSlice({
  name: 'userLocation',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLocationAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserLocationAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.data.position = action.payload.data;
      })
      .addCase(fetchUserLocationAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectUserLocation = (state) => state.userLocation;

export default userLocationSlice.reducer;
