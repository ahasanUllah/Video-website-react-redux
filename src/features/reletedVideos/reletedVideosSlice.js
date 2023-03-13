import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getReletedVideos } from './reletedVideosApi';

const initialState = {
   reletedVideos: [],
   isLoading: false,
   isError: false,
   error: '',
};

export const fetchReletedVideos = createAsyncThunk('reletedVideos/fetchReletedVideo', async ({ tags, id }) => {
   const reletedVideos = await getReletedVideos({ tags, id });
   return reletedVideos;
});

const reletedVideoSlice = createSlice({
   name: 'reletedVideos',
   initialState,
   extraReducers: (builder) => {
      builder
         .addCase(fetchReletedVideos.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(fetchReletedVideos.fulfilled, (state, action) => {
            state.isLoading = false;
            state.reletedVideos = action.payload;
         })
         .addCase(fetchReletedVideos.rejected, (state, action) => {
            state.isLoading = false;
            state.reletedVideos = [];
            state.isError = true;
            state.error = action.error?.message;
         });
   },
});

export default reletedVideoSlice.reducer;
