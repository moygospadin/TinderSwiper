import {CONFIRM_LOGIN} from './types';
import {checkEmailValid} from '../../utils/checkEmailValid';
import {Alert} from 'react-native';
const confirmLogin = (values) => {
  console.log('loginValues', values);
  const res = values.password.length !== 0 && checkEmailValid(values.mail);

  if (!res) {
    Alert.alert('Неверный логин или пароль');
  }
  return {type: CONFIRM_LOGIN, data: res};
};
export {confirmLogin};
