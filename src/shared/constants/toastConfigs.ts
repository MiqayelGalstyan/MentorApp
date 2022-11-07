import {IToast} from '@src/store/models/interfaces/toast.interface';

export const toastConfigsError: IToast = {
  type: 'danger',
  placement: 'bottom',
  duration: 3000,
  offset: 30,
  animationType: 'slide-in',
};

export const toastConfigsSuccess: IToast = {
  type: 'success',
  placement: 'bottom',
  duration: 3000,
  offset: 30,
  animationType: 'slide-in',
};
