import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   tags: [],
   search: '',
};

const filterSlice = createSlice({
   name: 'video',
   initialState,
   reducers: {
      tagSelected: (state, action) => {
         state.tags.push(action.payload);
      },
      tagRemoved: (state, action) => {
         const indexOfRemoveItem = state.tags.indexOf(action.payload);
         if (indexOfRemoveItem !== -1) {
            state.tags.splice(indexOfRemoveItem, 1);
         }
      },
      searched: (state, action) => {
         state.search = action.payload;
      },
   },
});

export default filterSlice.reducer;
export const { tagSelected, tagRemoved, searched } = filterSlice.actions;
