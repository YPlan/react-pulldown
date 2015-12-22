'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PulldownStage = _react2.default.createClass({
  displayName: 'PulldownStage',

  propTypes: {
    children: _react2.default.PropTypes.any,
    className: _react2.default.PropTypes.string,
    direction: _react2.default.PropTypes.string,
    height: _react2.default.PropTypes.number,
    name: _react2.default.PropTypes.string
  },

  contextTypes: {
    currentStage: _react2.default.PropTypes.object,
    previousStage: _react2.default.PropTypes.object
  },

  _isCurrentStage: function _isCurrentStage() {
    var currentStage = this.context.currentStage;
    var name = this.props.name;

    return currentStage.name === name;
  },
  _getDirection: function _getDirection() {
    var _context = this.context;
    var currentStage = _context.currentStage;
    var previousStage = _context.previousStage;
    var _props = this.props;
    var direction = _props.direction;
    var name = _props.name;

    if (previousStage && previousStage.name === name) {
      this.direction = currentStage.direction === 'top' ? 'bottom' : 'top';
    }

    return this.direction || direction;
  },
  _getHeight: function _getHeight() {
    var currentStage = this.context.currentStage;
    var height = this.props.height;

    return this._isCurrentStage() ? 0 : Math.max(height, currentStage.height);
  },
  _getTop: function _getTop() {
    var height = this._getHeight();

    return this._getDirection() === 'top' ? -height : height;
  },
  _getStyle: function _getStyle() {
    var height = this.props.height;

    return {
      height: height,
      position: 'absolute',
      top: this._getTop(),
      transition: 'all 500ms',
      width: '100%'
    };
  },
  render: function render() {
    var children = this.props.children;
    var className = this.props.className;

    if (this._isCurrentStage()) {
      className += ' ' + className + '--active';
    }

    return _react2.default.createElement(
      'div',
      { className: className, style: this._getStyle() },
      children
    );
  }
});

exports.default = PulldownStage;