'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PulldownClose = _react2.default.createClass({
  displayName: 'PulldownClose',

  propTypes: {
    children: _react2.default.PropTypes.any,
    className: _react2.default.PropTypes.string
  },

  contextTypes: {
    close: _react2.default.PropTypes.func
  },

  _handleClick: function _handleClick() {
    var close = this.context.close;

    close();
  },
  render: function render() {
    var _props = this.props;
    var children = _props.children;
    var className = _props.className;

    return _react2.default.createElement(
      'button',
      { className: className, onClick: this._handleClick },
      children
    );
  }
});

exports.default = PulldownClose;