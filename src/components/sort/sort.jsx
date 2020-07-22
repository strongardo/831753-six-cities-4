import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {connect} from "react-redux";
import {setSortType} from "../../reducer/condition/condition.js";
import {SortType} from "../../const.js";
import {withActiveFlag} from "../../hocs/with-active-flag/with-active-flag.jsx";
import {getSortType} from "../../reducer/condition/selectors.js";

const Sort = (props) => {
  const {sortType, onActiveChange, isActive, onLiClick} = props;

  const sortTypes = Object.values(SortType);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={onActiveChange}>
        {sortType}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={clsx(`places__options places__options--custom`, (isActive) && `places__options--opened`)}>
        {sortTypes.map((type) => {
          return (
            <li
              key={type}
              className={clsx(`places__option`, (sortType === type) && `places__option--active`)}
              onClick={() => {
                onLiClick(type, sortType);
              }}
              tabIndex={0}>
              {type}
            </li>
          );
        })}
      </ul>
    </form>
  );
};

Sort.propTypes = {
  sortType: PropTypes.string.isRequired,
  onActiveChange: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  onLiClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    sortType: getSortType(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLiClick(type, sortType) {
    if (sortType !== type) {
      dispatch(setSortType(type));
    }
  },
});

export {Sort};
export default withActiveFlag(connect(mapStateToProps, mapDispatchToProps)(Sort));
