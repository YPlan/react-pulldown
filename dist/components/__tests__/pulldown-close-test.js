'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('../pulldown-close');

var PulldownClose = require('../pulldown-close').default;

describe('PulldownClose', function () {
  var className = 'className';
  var close = undefined;
  var pulldownClose = undefined;

  beforeEach(function () {
    close = jest.genMockFunction();

    var FakeContext = _react2.default.createClass({
      displayName: 'FakeContext',

      propTypes: {
        children: _react2.default.PropTypes.element
      },
      childContextTypes: {
        close: _react2.default.PropTypes.func
      },
      getChildContext: function getChildContext() {
        return {
          close: close
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

    pulldownClose = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      FakeContext,
      null,
      _react2.default.createElement(PulldownClose, { className: className })
    ));
  });

  it('applies the class name', function () {
    var element = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(pulldownClose, 'button');

    expect(element.className).toBe(className);
  });

  it('calls the callback when clicked', function () {
    var element = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(pulldownClose, 'button');
    _reactAddonsTestUtils2.default.Simulate.click(element);

    expect(close).toBeCalled();
  });
});