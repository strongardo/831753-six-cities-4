import {reducer, ActionType} from "./user.js";
import {UserStatus} from "../../const.js";

const userData = {
  avatarUrl: `/img/avatar-angelina.jpg`,
  email: `mail@ln.kg`,
  isPro: true,
  name: `Angelina`,
};

describe(`User reducer tests`, () => {
  it(`The reducer without additional parameters should return the initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      userStatus: UserStatus.NO_AUTH,
      userData: {
        avatarUrl: ``,
        email: ``,
        isPro: false,
        name: ``,
      },
    });
  });

  it(`The reducer should change the initial values to new ones`, () => {
    expect(reducer({
      userStatus: UserStatus.NO_AUTH,
      userData: {
        avatarUrl: ``,
        email: ``,
        isPro: false,
        name: ``,
      },
    }, {
      type: ActionType.SET_USER_STATUS,
      payload: UserStatus.AUTH,
    })).toEqual({
      userStatus: UserStatus.AUTH,
      userData: {
        avatarUrl: ``,
        email: ``,
        isPro: false,
        name: ``,
      },
    });

    expect(reducer({
      userStatus: UserStatus.AUTH,
      userData: {
        avatarUrl: ``,
        email: ``,
        isPro: false,
        name: ``,
      },
    }, {
      type: ActionType.SET_USER_DATA,
      payload: userData,
    })).toEqual({
      userStatus: UserStatus.AUTH,
      userData,
    });
  });
});
