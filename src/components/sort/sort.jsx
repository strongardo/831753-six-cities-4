import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {SortType, sortTypes} from "../../const.js";

class Sort extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isShowed: false,
      sortType: SortType.POPULAR,
    };

    this._handleSpanClick = this._handleSpanClick.bind(this);
    this._handleLiClick = this._handleLiClick.bind(this);
  }

  render() {
    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span className="places__sorting-type" tabIndex={0} onClick={this._handleSpanClick}>
          {this.state.sortType}
          <svg className="places__sorting-arrow" width={7} height={4}>
            <use xlinkHref="#icon-arrow-select" />
          </svg>
        </span>
        <ul className={clsx(`places__options places__options--custom`, (this.state.isShowed) && `places__options--opened`)}>
          {sortTypes.map((type) => {
            return (
              <li
                key={type}
                className={clsx(`places__option`, (this.state.sortType === type) && `places__option--active`)}
                onClick={() => {
                  this._handleLiClick(type);
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
  }

  _handleSpanClick() {
    this.setState((state) => {
      return {isShowed: !state.isShowed};
    });
  }

  _handleLiClick(type) {
    if (this.state.sortType !== type) {
      this.setState({sortType: type});
      this.props.onSortTypeChange(type);
    }
  }
}

Sort.propTypes = {
  onSortTypeChange: PropTypes.func.isRequired,
};

export default Sort;
