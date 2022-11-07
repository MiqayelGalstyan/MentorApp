import {createSlice} from '@reduxjs/toolkit';
import {IUserInitialState} from '../models/interfaces/user.interface';

const initialState: IUserInitialState = {
  isAuthenticated: false,
  geolocation: null,
  userData: null,
};

const name = 'USER';

const userSlice = createSlice({
  name,
  initialState,
  reducers: {
    setAuth(state, {payload}) {
      state.isAuthenticated = payload;
    },
    setGeolocation(state, {payload}) {
      state.geolocation = payload;
    },
    setUserData(state, {payload}) {
      state.userData = payload;
    },
  },
});

export const selectUserAuthStatus = ({user}: {user: IUserInitialState}) =>
  user.isAuthenticated;

export const selectUserGeolocation = ({user}: {user: IUserInitialState}) =>
  user.geolocation;

export const selectUserData = ({user}: {user: IUserInitialState}) =>
  user?.userData;

export const {setAuth, setGeolocation, setUserData} = userSlice.actions;

export default userSlice.reducer;
