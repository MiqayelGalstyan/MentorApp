import {IEmployee} from './employee.interface';

export interface IUserInitialState {
  isAuthenticated: boolean;
  geolocation: null | {
    latitude: number;
    longitude: number;
  };
  userData: null | IUser;
}

export interface IUser {
  firstName?: string;
  lastName?: string;
  latitude?: number | string;
  longitude?: number | string;
  image?: string;
  department?: string;
  jobTitle?: string;
  workExperience?: string;
  employeesGroup?: IEmployee[];
}
