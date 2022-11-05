import {createSlice} from '@reduxjs/toolkit';
import {IUserInitialState} from '../models/interfaces/user.interface';

const initialState: IUserInitialState = {
  isAuthenticated: false,
};

const name = 'USER';

const userSlice = createSlice({
  name,
  initialState,
  reducers: {
    setAuth(state) {
      state.isAuthenticated = true;
    },
  },
});

export const selectUserAuthStatus = ({user}: {user: IUserInitialState}) =>
  user.isAuthenticated;

export const {setAuth} = userSlice.actions;

export default userSlice.reducer;
