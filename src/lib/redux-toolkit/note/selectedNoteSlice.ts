import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface SelectedNote {
  id: string;
  title: string;
  content: string;
  createdAt: null | string;
  updatedAt: null | string;
}

const initialState: SelectedNote = {
  id: '',
  title: '',
  content: '',
  createdAt: null,
  updatedAt: null,
};

export const counterSlice = createSlice({
  name: 'note list',
  initialState,
  reducers: {
    updateSelectedNote(
      state: SelectedNote,
      action: PayloadAction<SelectedNote>,
    ) {
      state.id = action.payload.id;
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.createdAt = action.payload.createdAt;
      state.updatedAt = action.payload.updatedAt;
    },
    resetSelectedNote(state: SelectedNote) {
      state.id = '';
      state.title = '';
      state.content = '';
      state.createdAt = null;
      state.updatedAt = null;
    },
  },
});

export const { updateSelectedNote, resetSelectedNote } = counterSlice.actions;
export default counterSlice.reducer;
