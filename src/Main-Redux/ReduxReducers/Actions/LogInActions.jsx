import { DATA_ENTRY, LOGIN_ERROR } from "../ActionType/ActionType";

export const toLogInData = (data) => {
  return {
    type: DATA_ENTRY,
    payload: data,
  };
};
export const toLogInError = (error) => {
  return {
    type: LOGIN_ERROR,
    payload: error,
  };
};

export const LoginAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch(toLogInData(data));
      console.log(data);
    } catch (error) {
      dispatch(toLogInError(error.message));
    }
  };
};
