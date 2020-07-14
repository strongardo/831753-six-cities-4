import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Review from "../review/review.jsx";
import {sortByDate} from "../../utils.js";
import {getReviewsAsync} from "../../reducer/data/data.js";

class ReviewsList extends PureComponent {
  constructor(props) {
    super(props);

    this._onSuccess = this._onSuccess.bind(this);
    this._onError = this._onError.bind(this);

    this.state = {
      reviews: [],
    };
  }

  render() {
    const getListMarkup = () => {
      const stateReviews = this.state.reviews;
      const reviews = (stateReviews.length <= 10) ? stateReviews : stateReviews.slice(0, 10);
      const sortedReviews = sortByDate(reviews);

      return (
        <ul className="reviews__list">
          {sortedReviews.map((review) => {
            return <Review key={review.id} review={review} />;
          })}
        </ul>
      );
    };

    return (
      <>
        <h2 className="reviews__title">
          Reviews · <span className="reviews__amount">{this.state.reviews.length}</span>
        </h2>
        {(this.state.reviews.length) ? getListMarkup() : null }
      </>
    );
  }

  _onSuccess(serverReviews) {
    this.setState({reviews: serverReviews});
  }

  _onError() {
    this.setState({reviews: []});
  }

  componentDidMount() {
    this.props.downloadReviews(this.props.id, this._onSuccess, this._onError);
  }

  componentDidUpdate() {
    this.props.downloadReviews(this.props.id, this._onSuccess, this._onError);
  }
}

ReviewsList.propTypes = {
  downloadReviews: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  downloadReviews(id, onSuccess, onError) {
    dispatch(getReviewsAsync(id, onSuccess, onError));
  },
});

export {ReviewsList};
export default connect(null, mapDispatchToProps)(ReviewsList);
