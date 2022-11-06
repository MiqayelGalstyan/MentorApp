import {createSlice} from '@reduxjs/toolkit';
import {IUserInitialState} from '../models/interfaces/user.interface';

const initialState: IUserInitialState = {
  isAuthenticated: false,
  geolocation: null,
};

const name = 'USER';

const userSlice = createSlice({
  name,
  initialState,
  reducers: {
    setAuth(state) {
      state.isAuthenticated = true;
    },
    setGeolocation(state, {payload}) {
      state.geolocation = payload;
    },
  },
});

export const selectUserAuthStatus = ({user}: {user: IUserInitialState}) =>
  user.isAuthenticated;

export const selectUserGeolocation = ({user}: {user: IUserInitialState}) =>
  user.geolocation;

export const {setAuth, setGeolocation} = userSlice.actions;

export default userSlice.reducer;
