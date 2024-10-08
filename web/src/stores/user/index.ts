import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface IUserState extends UserService.IUser {
}

const initialState: IUserState = {
  id: '',
  username: '',
  createTime: '',
  role: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<IUserState>) => {
      return {
        ...state,
        ...action.payload
      };
    },
    clearUserInfo: (state) => {
      return {
        ...initialState
      }
    },
  }
});

const userInfo = (state: RootState) => state.user;

const { setUserInfo, clearUserInfo } = userSlice.actions;

const userReducer = userSlice.reducer;

export {
  userInfo,
  setUserInfo,
  clearUserInfo,
  userReducer,
};
