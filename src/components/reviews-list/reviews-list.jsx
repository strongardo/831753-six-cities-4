import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Review from "../review/review.jsx";
import {getReviewsAsync} from "../../reducer/data/data.js";

class ReviewsList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <h2 className="reviews__title">
          Reviews · <span className="reviews__amount">{this.props.reviews.length}</span>
        </h2>
        {(this.props.reviews.length)
          ? (
            <ul className="reviews__list">
              {this.props.reviews.map((review) => {
                return <Review key={review.id} review={review} />;
              })}
            </ul>
          )
          : null}
      </>
    );
  }

  componentDidMount() {
    this.props.downloadReviews(this.props.id);
  }

  // || prevProps.reviews.length !== this.props.reviews.length
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
