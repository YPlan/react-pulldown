'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('../pulldown');

var Pulldown = require('../pulldown').default;
var PulldownStage = require('../pulldown-stage').default;

describe('Pulldown', function () {
  var className = 'className';
  var onChange = jest.genMockFunction();
  var onClose = jest.genMockFunction();
  var onOpen = jest.genMockFunction();
  var stageName = 'b';
  var pulldown = undefined;

  beforeEach(function () {
    pulldown = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
      Pulldown,
      {
        className: className,
        defaultStage: 'a',
        delay: 1000,
        onChange: onChange,
        onClose: onClose,
        onOpen: onOpen
      },
      _react2.default.createElement(PulldownStage, { name: 'a' }),
      _react2.default.createElement(PulldownStage, { name: stageName })
    ));
  });

  it('applies the class name', function () {
    var element = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(pulldown, 'div');

    expect(element.className).toBe(className);
  });

  it('fires the onChange callback', function () {
    pulldown._goTo(stageName);

    expect(onChange).toBeCalledWith(stageName);
  });

  it('fires the onClose callback', function () {
    pulldown._close();

    expect(onClose).toBeCalled();
  });

  it('disappears when closed', function () {
    pulldown._close();
    var element = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(pulldown, 'div');

    expect(element.style.top).toBe('-100%');
  });

  it('fires the onOpen callback', function () {
    jest.runAllTimers();

    expect(onOpen).toBeCalled();
  });

  it('appears when open', function () {
    jest.runAllTimers();
    var element = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(pulldown, 'div');

    expect(element.style.top).toBe('0px');
  });

  it('waits for the delay to appear', function () {
    var element = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(pulldown, 'div');
    expect(element.style.top).toBe('-100%');

    jest.runAllTimers();
    expect(element.style.top).toBe('0px');
  });
});