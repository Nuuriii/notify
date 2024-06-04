import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Note {
  id: string;
  user_id: string;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ListNote {
  noteList: Note[];
}

const initialState: ListNote = {
  noteList: [],
};

export const counterSlice = createSlice({
  name: 'note list',
  initialState,
  reducers: {
    updateListNote(state, action: PayloadAction<Note[]>) {
      state.noteList = action.payload;
    },
    addNote(state, action: PayloadAction<Note>) {
      state.noteList.push(action.payload);
    },
    deleteNote(state, action: PayloadAction<string>) {
      state.noteList = state.noteList.filter(
        (task) => task.id !== action.payload,
      );
    },
  },
});

export const { updateListNote, addNote, deleteNote } = counterSlice.actions;
export default counterSlice.reducer;