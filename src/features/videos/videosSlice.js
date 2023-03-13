import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getVideo } from './videosApi';

const initialState = {
   videos: [],
   isLoading: false,
   isError: false,
   error: '',
};

export const fetchVideos = createAsyncThunk('videos/fetchVideo', async ({ tags, search }) => {
   const videos = await getVideo({ tags, search });
   return videos;
});

const videosSlice = createSlice({
   name: 'videos',
   initialState,
   extraReducers: (builder) => {
      builder
         .addCase(fetchVideos.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(fetchVideos.fulfilled, (state, action) => {
            state.isLoading = false;
            state.videos = action.payload;
         })
         .addCase(fetchVideos.rejected, (state, action) => {
            state.isLoading = false;
            state.videos = [];
            state.isError = true;
            state.error = action.error?.message;
         });
   },
});

export default videosSlice.reducer;
