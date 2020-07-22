import {extend} from "../../utils.js";
import {SortType} from "../../const.js";

const initialState = {
  city: {},
  sortType: SortType.POPULAR,
};

const ActionType = {
  SET_ACTIVE_CITY: `SET_ACTIVE_CITY`,
  SET_SORT_TYPE: `SET_SORT_TYPE`,
};

const setActiveCity = (city) => {
  return {
    type: ActionType.SET_ACTIVE_CITY,
    payload: city,
  };
};

const setSortType = (sortType) => {
  return {
    type: ActionType.SET_SORT_TYPE,
    payload: sortType,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_ACTIVE_CITY:
      return extend(state, {
        city: action.payload,
      });
    case ActionType.SET_SORT_TYPE:
      return extend(state, {
        sortType: action.payload,
      });
  }

  return state;
};

export {reducer, setActiveCity, setSortType};
