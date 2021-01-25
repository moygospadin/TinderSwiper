import {CONFIRM_LOGIN} from './types';
const initialState = {
  isLogin: true,
};
function loginReducer(state = initialState, action) {
  switch (action.type) {
    case CONFIRM_LOGIN:
      console.log('CONFIRM_LOGIN');
      return {
        ...state,
        isLogin: action.data,
      };

    default:
      return state;
  }
}
export default loginReducer;
