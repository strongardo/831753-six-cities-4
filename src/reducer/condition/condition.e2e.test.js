import {reducer, ActionType} from "./condition.js";
import {SortType} from "../../const.js";

describe(`Condition reducer tests`, () => {
  it(`The reducer without additional parameters should return the initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      city: {},
      sortType: SortType.POPULAR,
    });
  });

  it(`The reducer should change the initial values to new ones`, () => {
    expect(reducer({
      city: {},
      sortType: SortType.POPULAR,
    }, {
      type: ActionType.SET_ACTIVE_CITY,
      payload: {
        name: `Paris`,
        id: `Paris`,
      },
    })).toEqual({
      city: {
        name: `Paris`,
        id: `Paris`,
      },
      sortType: SortType.POPULAR,
    });

    expect(reducer({
      city: {},
      sortType: SortType.POPULAR,
    }, {
      type: ActionType.SET_SORT_TYPE,
      payload: SortType.TOP_RATED_FIRST,
    })).toEqual({
      city: {},
      sortType: SortType.TOP_RATED_FIRST,
    });
  });
});
