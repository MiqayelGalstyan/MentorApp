export interface IUserInitialState {
  isAuthenticated: boolean;
  geolocation: null | {
    latitude: number;
    longitude: number;
  };
}
