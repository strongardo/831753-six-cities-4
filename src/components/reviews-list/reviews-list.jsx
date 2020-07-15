import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Review from "../review/review.jsx";
import {sortByDate} from "../../utils.js";
import {getReviewsAsync} from "../../reducer/data/data.js";

class ReviewsList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const getListMarkup = () => {
      const propsReviews = this.props.reviews;
      const reviews = (propsReviews.length <= 10) ? propsReviews : propsReviews.slice(0, 10);
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
          Reviews · <span className="reviews__amount">{this.props.reviews.length}</span>
        </h2>
        {(this.props.reviews.length) ? getListMarkup() : null}
      </>
    );
  }

  componentDidMount() {
    this.props.downloadReviews(this.props.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.props.downloadReviews(this.props.id);
    }
  }
}

ReviewsList.propTypes = {
  downloadReviews: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  reviews: PropTypes.array.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  downloadReviews(id) {
    dispatch(getReviewsAsync(id));
  },
});

export {ReviewsList};
export default connect(null, mapDispatchToProps)(ReviewsList);
