import React from 'react';
import shallowequal from 'shallowequal';

const PulldownStage = React.createClass({

  propTypes: {
    children: React.PropTypes.any,
    className: React.PropTypes.string,
    direction: React.PropTypes.string,
    height: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
  },

  contextTypes: {
    currentStage: React.PropTypes.object,
    previousStage: React.PropTypes.object,
    update: React.PropTypes.func,
  },

  componentDidUpdate(prevProps) {
    const {update} = this.context;

    if (this._isCurrentStage() && !shallowequal(prevProps, this.props)) {
      update();
    }
  },

  _isCurrentStage() {
    const {currentStage} = this.context;
    const {name} = this.props;

    return currentStage.name === name;
  },

  _getDirection() {
    const {currentStage, previousStage} = this.context;
    const {direction, name} = this.props;

    if (previousStage && previousStage.name === name) {
      this.direction = currentStage.direction === 'top' ? 'bottom' : 'top';
    }

    return this.direction || direction;
  },

  _getHeight() {
    const {currentStage} = this.context;
    const {height} = this.props;

    return this._isCurrentStage() ? 0 : Math.max(height, currentStage.height);
  },

  _getTop() {
    const height = this._getHeight();

    return this._getDirection() === 'top' ? -height : height;
  },

  _getStyle() {
    const {height} = this.props;

    return {
      height: height,
      position: 'absolute',
      top: this._getTop(),
      transition: 'all 500ms',
      width: '100%',
    };
  },

  render() {
    const {children} = this.props;
    let {className} = this.props;

    if (className && this._isCurrentStage()) {
      className += ` ${className}--active`;
    }

    return (
      <div className={className} style={this._getStyle()}>
        {children}
      </div>
    );
  },

});

export default PulldownStage;
