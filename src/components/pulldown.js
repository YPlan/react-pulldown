import React from 'react';

const Pulldown = React.createClass({

  propTypes: {
    children: React.PropTypes.any,
    className: React.PropTypes.string,
    defaultStage: React.PropTypes.string.isRequired,
    delay: React.PropTypes.number,
    onChange: React.PropTypes.func,
    onClose: React.PropTypes.func,
    onOpen: React.PropTypes.func,
  },

  childContextTypes: {
    close: React.PropTypes.func,
    currentStage: React.PropTypes.object,
    goTo: React.PropTypes.func,
    previousStage: React.PropTypes.object,
    update: React.PropTypes.func,
  },

  getInitialState() {
    const {defaultStage, delay} = this.props;

    return {
      currentStage: this._getStage(defaultStage),
      open: !delay,
    };
  },

  componentDidMount() {
    const {delay} = this.props;

    this.timeout = setTimeout(this._open, delay);
  },

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  },

  getChildContext() {
    const {currentStage, previousStage} = this.state;

    return {
      close: this._close,
      currentStage: currentStage,
      goTo: this._goTo,
      previousStage: previousStage,
      update: this._update,
    };
  },

  _getStage(stageName) {
    const {children} = this.props;
    let currentStage;

    React.Children.forEach(children, child => {
      if (child.props.name === stageName) {
        currentStage = child.props;
      }
    });

    return currentStage;
  },

  _goTo(stageName) {
    const {onChange} = this.props;

    this.setState({
      currentStage: this._getStage(stageName),
      previousStage: this.state.currentStage,
    }, () => {
      if (onChange) {
        onChange(stageName);
      }
    });
  },

  _close() {
    const {onClose} = this.props;

    this.setState({
      open: false,
    }, onClose);
  },

  _open() {
    const {onOpen} = this.props;

    this.setState({
      open: true,
    }, onOpen);
  },

  _update() {
    const {currentStage} = this.state;

    this.setState({
      currentStage: this._getStage(currentStage.name),
    });
  },

  _getStyle() {
    const {currentStage, open} = this.state;

    return {
      height: currentStage.height,
      overflow: 'hidden',
      position: 'fixed',
      top: open ? 0 : '-100%',
      transition: 'all 500ms',
      width: '100%',
      zIndex: 999,
    };
  },

  render() {
    const {children} = this.props;
    let {className} = this.props;
    const {open} = this.state;

    if (className && open) {
      className += ` ${className}--open`;
    }

    return (
      <div className={className} style={this._getStyle()}>
        {children}
      </div>
    );
  },

});

export default Pulldown;
