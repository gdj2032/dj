import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface ISysState {
  sysTheme: string;
}

const initialState: ISysState = {
  sysTheme: 'black'
};

const sysSlice = createSlice({
  name: 'sys',
  initialState,
  reducers: {
    setSysTheme(state, actions) {
      state.sysTheme = actions.payload;
    }
  }
});

const sysInfo = (state: RootState) => state.sys;

const { setSysTheme } = sysSlice.actions;

const sysReducer = sysSlice.reducer;

export { sysReducer, sysInfo, setSysTheme };
