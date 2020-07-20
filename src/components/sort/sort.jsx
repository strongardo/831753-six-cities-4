import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {connect} from "react-redux";
import {setSortType, setOffers} from "../../reducer/condition/condition.js";
import {SortType} from "../../const.js";
import {sortOffersByType} from "../../utils.js";
import {withActiveFlag} from "../../hocs/with-active-flag/with-active-flag.jsx";
import {getSortType, getOffers} from "../../reducer/condition/selectors.js";

const Sort = (props) => {

  const sortTypes = Object.values(SortType);

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
                props.onLiClick(type, props.sortType, props.offers);
              }}
              tabIndex={0}>
              {type}
            </li>
          );
        })}
      </ul>

      {/* <select className="places__sorting-type" id="places-sorting" value={props.sortType}>
        <option className="places__option" value="Popular">Popular</option>
        <option className="places__option" value="Price: low to high">Price: low to high</option>
        <option className="places__option" value="Price: high to low">Price: high to low</option>
        <option className="places__option" value="Top rated first">Top rated first</option>
      </select> */}

    </form>
  );
};

Sort.propTypes = {
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
  onLiClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    sortType: getSortType(state),
    offers: getOffers(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLiClick(type, sortType, propsOffers) {
    if (sortType !== type) {
      const offers = sortOffersByType(propsOffers, type);
      dispatch(setSortType(type));
      dispatch(setOffers(offers));
    }
  },
});

export {Sort};
export default withActiveFlag(connect(mapStateToProps, mapDispatchToProps)(Sort));
