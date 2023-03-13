import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getVideo } from './videoApi';

const initialState = {
   video: {},
   isLoading: false,
   isError: false,
   error: '',
};

export const fetchVideo = createAsyncThunk('video/fetchVideo', async (videoId) => {
   const video = await getVideo(videoId);
   return video;
});

const videoSlice = createSlice({
   name: 'video',
   initialState,
   extraReducers: (builder) => {
      builder
         .addCase(fetchVideo.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(fetchVideo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.video = action.payload;
         })
         .addCase(fetchVideo.rejected, (state, action) => {
            state.isLoading = false;
            state.video = {};
            state.isError = true;
            state.error = action.error?.message;
         });
   },
});

export default videoSlice.reducer;
