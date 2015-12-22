'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('../pulldown-goto');

var PulldownGoto = require('../pulldown-goto').default;

describe('PulldownGoto', function () {
  var className = 'className';
  var stage = 'stage';
  var goTo = undefined;
  var pulldownGoto = undefined;

  beforeEach(function () {
    goTo = jest.genMockFunction();

    var FakeContext = _react2.default.createClass({
      displayName: 'FakeContext',

      propTypes: {
        children: _react2.default.PropTypes.element
      },
      childContextTypes: {
        goTo: _react2.default.PropTypes.func
      },
      getChildContext: function getChildContext() {
        return {
          goTo: goTo
        };
      },
      render: function render() {
        return _react2.default.createElement(
          'div',
          null,
          this.props.children
        );
      }
    });

    pulldownGoto = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      FakeContext,
      null,
      _react2.default.createElement(PulldownGoto, { className: className, stage: stage })
    ));
  });

  it('applies the class name', function () {
    var element = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(pulldownGoto, 'button');

    expect(element.className).toBe(className);
  });

  it('calls the callback when clicked', function () {
    var element = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(pulldownGoto, 'button');
    _reactAddonsTestUtils2.default.Simulate.click(element);

    expect(goTo).toBeCalledWith(stage);
  });
});