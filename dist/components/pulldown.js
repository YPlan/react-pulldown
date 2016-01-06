'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
    fixed: _react2.default.PropTypes.bool,
    onChange: _react2.default.PropTypes.func,
    onClose: _react2.default.PropTypes.func,
    onOpen: _react2.default.PropTypes.func
  },

  childContextTypes: {
    close: _react2.default.PropTypes.func,
    currentStage: _react2.default.PropTypes.object,
    goTo: _react2.default.PropTypes.func,
    previousStage: _react2.default.PropTypes.object,
    update: _react2.default.PropTypes.func
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
      previousStage: previousStage,
      update: this._update
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
  _update: function _update() {
    var currentStage = this.state.currentStage;

    this.setState({
      currentStage: this._getStage(currentStage.name)
    });
  },
  _getStyle: function _getStyle() {
    var _state2 = this.state;
    var currentStage = _state2.currentStage;
    var open = _state2.open;
    var fixed = this.props.fixed;

    var style = undefined;

    if (fixed) {
      style = {
        height: currentStage.height,
        position: 'fixed',
        top: open ? 0 : '-100%',
        zIndex: 999
      };
    } else {
      style = {
        height: currentStage.height,
        marginTop: open ? 0 : -currentStage.height + 'px',
        position: 'relative'
      };
    }

    return _extends({
      overflow: 'hidden',
      transition: 'all 500ms',
      width: '100%'
    }, style);
  },
  render: function render() {
    var children = this.props.children;
    var className = this.props.className;
    var open = this.state.open;

    if (className && open) {
      className += ' ' + className + '--open';
    }

    return _react2.default.createElement(
      'div',
      { className: className, style: this._getStyle() },
      children
    );
  }
});

exports.default = Pulldown;