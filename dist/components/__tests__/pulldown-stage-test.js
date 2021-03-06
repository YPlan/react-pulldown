'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint react/no-multi-comp:0 */

jest.dontMock('shallowequal');
jest.dontMock('../pulldown-stage');

var PulldownStage = require('../pulldown-stage').default;

function createFakeContext(childContext) {
  return _react2.default.createClass({
    propTypes: {
      children: _react2.default.PropTypes.element
    },
    childContextTypes: {
      currentStage: _react2.default.PropTypes.object,
      previousStage: _react2.default.PropTypes.object,
      update: _react2.default.PropTypes.func
    },
    getChildContext: function getChildContext() {
      return childContext;
    },
    render: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.props.children
      );
    }
  });
}

describe('PulldownStage', function () {
  var FakeContext = undefined;
  var pulldownStage = undefined;

  describe('current stage', function () {
    beforeEach(function () {
      FakeContext = createFakeContext({
        currentStage: {
          name: 'currentStage'
        }
      });

      pulldownStage = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
        FakeContext,
        null,
        _react2.default.createElement(PulldownStage, {
          className: 'className',
          height: 100,
          name: 'currentStage'
        })
      ));
    });

    it('applies the class modifier', function () {
      var element = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithTag(pulldownStage, 'div')[1];

      expect(element.className).toContain('className--active');
    });

    it('sets the top to zero', function () {
      var element = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithTag(pulldownStage, 'div')[1];

      expect(element.style.top).toBe('0px');
    });
  });

  describe('previous stage (top)', function () {
    beforeEach(function () {
      FakeContext = createFakeContext({
        currentStage: {
          direction: 'top',
          height: 100,
          name: 'currentStage'
        },
        previousStage: {
          name: 'previousStage'
        }
      });

      pulldownStage = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
        FakeContext,
        null,
        _react2.default.createElement(PulldownStage, {
          height: 100,
          name: 'previousStage'
        })
      ));
    });

    it('sets the top to height', function () {
      var element = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithTag(pulldownStage, 'div')[1];

      expect(element.style.top).toBe('100px');
    });
  });

  describe('previous stage (bottom)', function () {
    beforeEach(function () {
      FakeContext = createFakeContext({
        currentStage: {
          direction: 'bottom',
          height: 100,
          name: 'currentStage'
        },
        previousStage: {
          name: 'previousStage'
        }
      });

      pulldownStage = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
        FakeContext,
        null,
        _react2.default.createElement(PulldownStage, {
          height: 100,
          name: 'previousStage'
        })
      ));
    });

    it('sets the top to negative height', function () {
      var element = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithTag(pulldownStage, 'div')[1];

      expect(element.style.top).toBe('-100px');
    });
  });

  describe('stage', function () {
    beforeEach(function () {
      FakeContext = createFakeContext({
        currentStage: {}
      });

      pulldownStage = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
        FakeContext,
        null,
        _react2.default.createElement(PulldownStage, {
          className: 'className',
          height: 100,
          name: 'name'
        })
      ));
    });

    it('applies the class name', function () {
      var element = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithTag(pulldownStage, 'div')[1];

      expect(element.className).toContain('className');
    });
  });

  describe('stage (height > currentStage height)', function () {
    beforeEach(function () {
      FakeContext = createFakeContext({
        currentStage: {
          height: 100
        }
      });

      pulldownStage = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
        FakeContext,
        null,
        _react2.default.createElement(PulldownStage, {
          direction: 'top',
          height: 101,
          name: 'name'
        })
      ));
    });

    it('sets the top to the maximum height', function () {
      var element = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithTag(pulldownStage, 'div')[1];

      expect(element.style.top).toBe('-101px');
    });
  });

  describe('stage (height < currentStage height)', function () {
    beforeEach(function () {
      FakeContext = createFakeContext({
        currentStage: {
          height: 101
        }
      });

      pulldownStage = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
        FakeContext,
        null,
        _react2.default.createElement(PulldownStage, {
          direction: 'top',
          height: 100,
          name: 'name'
        })
      ));
    });

    it('sets the top to the maximum height', function () {
      var element = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithTag(pulldownStage, 'div')[1];

      expect(element.style.top).toBe('-101px');
    });
  });

  describe('stage (top)', function () {
    beforeEach(function () {
      FakeContext = createFakeContext({
        currentStage: {
          height: 100
        }
      });

      pulldownStage = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
        FakeContext,
        null,
        _react2.default.createElement(PulldownStage, {
          direction: 'top',
          height: 100,
          name: 'name'
        })
      ));
    });

    it('sets the top to the negative height', function () {
      var element = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithTag(pulldownStage, 'div')[1];

      expect(element.style.top).toBe('-100px');
    });
  });

  describe('stage (bottom)', function () {
    beforeEach(function () {
      FakeContext = createFakeContext({
        currentStage: {
          height: 100
        }
      });

      pulldownStage = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
        FakeContext,
        null,
        _react2.default.createElement(PulldownStage, {
          direction: 'bottom',
          height: 100,
          name: 'name'
        })
      ));
    });

    it('sets the top to the height', function () {
      var element = _reactAddonsTestUtils2.default.scryRenderedDOMComponentsWithTag(pulldownStage, 'div')[1];

      expect(element.style.top).toBe('100px');
    });
  });

  describe('update', function () {
    function createParent(childContext) {
      FakeContext = createFakeContext(childContext);
      return _react2.default.createClass({
        getInitialState: function getInitialState() {
          return {
            height: 100
          };
        },
        render: function render() {
          var height = this.state.height;

          return _react2.default.createElement(
            FakeContext,
            null,
            _react2.default.createElement(PulldownStage, {
              height: height,
              name: 'a'
            })
          );
        }
      });
    }

    it('fires the callback if is current and props change', function () {
      var update = jest.genMockFunction();
      var Parent = createParent({
        currentStage: {
          name: 'a'
        },
        update: update
      });
      var parent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(Parent, null));
      parent.setState({
        height: 200
      });

      expect(update).toBeCalled();
    });

    it('does not fire the callback if is current and props do not change', function () {
      var update = jest.genMockFunction();
      var Parent = createParent({
        currentStage: {
          name: 'a'
        },
        update: update
      });
      var parent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(Parent, null));
      parent.setState({
        height: 100
      });

      expect(update).not.toBeCalled();
    });

    it('does not fire the callback if is not current', function () {
      var update = jest.genMockFunction();
      var Parent = createParent({
        currentStage: {
          name: 'b',
          height: 100
        },
        update: update
      });
      var parent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(Parent, null));
      parent.setState({
        height: 200
      });

      expect(update).not.toBeCalled();
    });
  });
});