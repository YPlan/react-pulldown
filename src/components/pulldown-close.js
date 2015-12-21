import React from 'react';

const PulldownClose = React.createClass({

  propTypes: {
    children: React.PropTypes.any,
    className: React.PropTypes.string,
  },

  contextTypes: {
    close: React.PropTypes.func,
  },

  _handleClick() {
    const {close} = this.context;

    close();
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

export default PulldownClose;
