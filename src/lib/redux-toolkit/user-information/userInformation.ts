import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserInformation {
  displayName: string;
  photoUrl: string;
}

const initialState: UserInformation = {
  displayName: '',
  photoUrl: '',
};

export const userInformation = createSlice({
  name: 'user-information',
  initialState,
  reducers: {
    updateDisplayName: (state, action: PayloadAction<string>) => {
      state.displayName = action.payload;
    },
    updatePhotoUrl: (state, action: PayloadAction<string>) => {
      state.photoUrl = action.payload;
    },
    resetUserInformation: (state) => {
      return initialState;
    },
  },
});

export const { updateDisplayName, updatePhotoUrl, resetUserInformation } =
  userInformation.actions;

export default userInformation.reducer;
