import { configureStore } from '@reduxjs/toolkit';
import filterSlice from '../features/filter/filterSlice';
import reletedVideosSlice from '../features/reletedVideos/reletedVideosSlice';
import tagsSlice from '../features/tags/tagsSlice';
import videoSlice from '../features/video/videoSlice';
import videosSlice from '../features/videos/videosSlice';

export const store = configureStore({
   reducer: {
      videos: videosSlice,
      tags: tagsSlice,
      video: videoSlice,
      reletedVideos: reletedVideosSlice,
      filter: filterSlice,
   },
});
