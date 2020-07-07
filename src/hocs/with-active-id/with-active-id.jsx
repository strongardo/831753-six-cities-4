import React, {PureComponent} from "react";

export const withActiveId = (Component) => {
  return class WithActiveIdComponent extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeId: 0,
      };

      this._handleActiveIdChange =
        this._handleActiveIdChange.bind(this);
    }

    _handleActiveIdChange(id) {
      if (this.state.activeId) {
        this.setState({activeId: 0});
      } else {
        this.setState({activeId: id});
      }
    }

    render() {
      return (
        <Component
          {...this.props}
          activeCardId={this.state.activeId}
          onActiveCardIdChange={this._handleActiveIdChange}
        />
      );
    }
  };
};
