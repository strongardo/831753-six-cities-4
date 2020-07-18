import {extend} from "../../utils.js";
import adaptUserData from "../../adapters/user.js";
import {UserStatus} from "../../const.js";
import {AppRoute} from "../../const.js";

const initialState = {
  userStatus: UserStatus.NO_AUTH,
  userData: {
    avatarUrl: ``,
    email: ``,
    isPro: false,
    name: ``,
  }
};

const ActionType = {
  SET_USER_STATUS: `SET_USER_STATUS`,
  SET_USER_DATA: `SET_USER_DATA`,
};

const setUserStatus = (status) => {
  return {
    type: ActionType.SET_USER_STATUS,
    payload: status,
  };
};

const setUserData = (userData) => {
  return {
    type: ActionType.SET_USER_DATA,
    payload: userData,
  };
};

const onSuccess = (response, dispatch) => {
  const userData = adaptUserData(response.data);
  dispatch(setUserStatus(UserStatus.AUTH));
  dispatch(setUserData(userData));
};

const getUserStatusAsync = () => (dispatch, getState, api) => {
  return api.get(`/login`)
    .then((response) => {
      onSuccess(response, dispatch);
    })
    .catch((err) => {
      throw err;
    });
};

const setUserStatusAsync = (userData, push) => (dispatch, getState, api) => {
  return api.post(`/login`, {
    email: userData.login,
    password: userData.password,
  })
    .then((response) => {
      onSuccess(response, dispatch, push);
      push(AppRoute.ROOT);
    })
    .catch((err) => {
      throw err;
    });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_USER_STATUS:
      return extend(state, {
        userStatus: action.payload,
      });
    case ActionType.SET_USER_DATA:
      return extend(state, {
        userData: action.payload,
      });
  }

  return state;
};

export {reducer, setUserStatus, getUserStatusAsync, setUserStatusAsync};
