import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.USER;

export const getUserStatus = (state) => {
  return state[NAME_SPACE].userStatus;
};

export const getUserData = (state) => {
  return state[NAME_SPACE].userData;
};


