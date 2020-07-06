import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setSortType} from "../../reducer/reducer.js";
import {SortType} from "../../const.js";
import {sortOffersByType} from "../../utils.js";
import {withActiveFlag} from "../with-active-flag/with-active-flag.jsx";

const Sort = (props) => {

  const sortTypes = Object.values(SortType);

  const handleLiClick = (type) => {
    if (props.sortType !== type) {
      const offers = sortOffersByType(props.offers, type);
      props.setSortType(type, offers);
    }
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={props.onActiveChange}>
        {props.sortType}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={clsx(`places__options places__options--custom`, (props.isActive) && `places__options--opened`)}>
        {sortTypes.map((type) => {
          return (
            <li
              key={type}
              className={clsx(`places__option`, (props.sortType === type) && `places__option--active`)}
              onClick={() => {
                handleLiClick(type);
              }}
              tabIndex={0}>
              {type}
            </li>
          );
        })}
      </ul>
      {/*
      <select class="places__sorting-type" id="places-sorting">
        <option class="places__option" value="popular" selected="">Popular</option>
        <option class="places__option" value="to-high">Price: low to high</option>
        <option class="places__option" value="to-low">Price: high to low</option>
        <option class="places__option" value="top-rated">Top rated first</option>
      </select>
      */}
    </form>
  );
};

Sort.propTypes = {
  setSortType: PropTypes.func.isRequired,
  sortType: PropTypes.string.isRequired,
  onActiveChange: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        starsCount: PropTypes.number.isRequired,
        isPremium: PropTypes.bool.isRequired,
        coordinates: PropTypes.arrayOf(PropTypes.number),
        id: PropTypes.number.isRequired,
      })
  ).isRequired,
};

const mapStateToProps = ({sortType, offers}) => ({sortType, offers});

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({setSortType}, dispatch);
};

export {Sort};
export default withActiveFlag(connect(mapStateToProps, matchDispatchToProps)(Sort));
