import React, {PureComponent} from "react";
import {extend} from "../../utils.js";
import {AUXILIARY_NUMBER_FOR_RAITING, NUMBER_FOR_LACK_OF_RATING} from "../../const.js";

export const withFormLogic = (Component) => {
  return class WithFormLogicComponent extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        text: ``,
        starsCount: NUMBER_FOR_LACK_OF_RATING,
        allDisabled: false,
        isError: false,
      };

      this._onTextAriaChange = this._onTextAriaChange.bind(this);
      this._onRadioChange = this._onRadioChange.bind(this);
      this._allDisabledChange = this._allDisabledChange.bind(this);
      this._onErrorForAlert = this._onErrorForAlert.bind(this);
    }

    _onTextAriaChange(value) {
      this.setState(
          extend(this.state, {
            text: value,
          })
      );
    }

    _onRadioChange(value) {
      this.setState(
          extend(this.state, {
            starsCount: AUXILIARY_NUMBER_FOR_RAITING - value,
          })
      );
    }

    _allDisabledChange() {
      this.setState(
          (prevState) => (extend(this.state, {
            allDisabled: !prevState.allDisabled,
          }))
      );
    }

    _onErrorForAlert(value) {
      this.setState(
          extend(this.state, {
            isError: value,
          })
      );
    }

    render() {
      return (
        <Component
          {...this.props}
          text={this.state.text}
          starsCount={this.state.starsCount}
          allDisabled={this.state.allDisabled}
          isError={this.state.isError}
          onTextAriaChange={this._onTextAriaChange}
          onRadioChange={this._onRadioChange}
          allDisabledChange={this._allDisabledChange}
          onErrorForAlert={this._onErrorForAlert}
        />
      );
    }
  };
};
