'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pulldown = _react2.default.createClass({
  displayName: 'Pulldown',

  propTypes: {
    children: _react2.default.PropTypes.any,
    className: _react2.default.PropTypes.string,
    defaultStage: _react2.default.PropTypes.string.isRequired,
    delay: _react2.default.PropTypes.number,
    onChange: _react2.default.PropTypes.func,
    onClose: _react2.default.PropTypes.func,
    onOpen: _react2.default.PropTypes.func
  },

  childContextTypes: {
    close: _react2.default.PropTypes.func,
    currentStage: _react2.default.PropTypes.object,
    goTo: _react2.default.PropTypes.func,
    previousStage: _react2.default.PropTypes.object
  },

  getInitialState: function getInitialState() {
    var _props = this.props;
    var defaultStage = _props.defaultStage;
    var delay = _props.delay;

    return {
      currentStage: this._getStage(defaultStage),
      open: !delay
    };
  },
  componentDidMount: function componentDidMount() {
    var delay = this.props.delay;

    this.timeout = setTimeout(this._open, delay);
  },
  componentWillUnmount: function componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  },
  getChildContext: function getChildContext() {
    var _state = this.state;
    var currentStage = _state.currentStage;
    var previousStage = _state.previousStage;

    return {
      close: this._close,
      currentStage: currentStage,
      goTo: this._goTo,
      previousStage: previousStage
    };
  },
  _getStage: function _getStage(stageName) {
    var children = this.props.children;

    var currentStage = undefined;

    _react2.default.Children.forEach(children, function (child) {
      if (child.props.name === stageName) {
        currentStage = child.props;
      }
    });

    return currentStage;
  },
  _goTo: function _goTo(stageName) {
    var onChange = this.props.onChange;

    this.setState({
      currentStage: this._getStage(stageName),
      previousStage: this.state.currentStage
    }, function () {
      if (onChange) {
        onChange(stageName);
      }
    });
  },
  _close: function _close() {
    var onClose = this.props.onClose;

    this.setState({
      open: false
    }, onClose);
  },
  _open: function _open() {
    var onOpen = this.props.onOpen;

    this.setState({
      open: true
    }, onOpen);
  },
  _getStyle: function _getStyle() {
    var _state2 = this.state;
    var currentStage = _state2.currentStage;
    var open = _state2.open;

    return {
      height: currentStage.height,
      overflow: 'hidden',
      position: 'fixed',
      top: open ? 0 : '-100%',
      transition: 'all 500ms',
      width: '100%',
      zIndex: 999
    };
  },
  render: function render() {
    var _props2 = this.props;
    var children = _props2.children;
    var className = _props2.className;

    return _react2.default.createElement(
      'div',
      { className: className, style: this._getStyle() },
      children
    );
  }
});

exports.default = Pulldown;