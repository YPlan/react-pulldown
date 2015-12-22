import React from 'react';

const PulldownGoto = React.createClass({

  propTypes: {
    children: React.PropTypes.any,
    className: React.PropTypes.string,
    stage: React.PropTypes.string.isRequired,
  },

  contextTypes: {
    goTo: React.PropTypes.func,
  },

  _handleClick() {
    const {goTo} = this.context;
    const {stage} = this.props;

    goTo(stage);
  },

  render() {
    const {children, className} = this.props;

    return (
      <button className={className} onClick={this._handleClick}>
        {children}
      </button>
    );
  },

});

export default PulldownGoto;
