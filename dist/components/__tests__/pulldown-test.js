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
  var defaultStageName = 'a';
  var delay = 1000;
  var height = 100;
  var nextStageName = 'b';
  var onChange = jest.genMockFunction();
  var onClose = jest.genMockFunction();
  var onOpen = jest.genMockFunction();
  var pulldown = undefined;

  describe('default', function () {
    beforeEach(function () {
      pulldown = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
        Pulldown,
        {
          className: className,
          defaultStage: defaultStageName,
          delay: delay,
          onChange: onChange,
          onClose: onClose,
          onOpen: onOpen
        },
        _react2.default.createElement(PulldownStage, { height: height, name: defaultStageName }),
        _react2.default.createElement(PulldownStage, { name: nextStageName })
      ));
    });

    it('applies the class name', function () {
      var element = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(pulldown, 'div');

      expect(element.className).toBe(className);
    });

    it('sets the current stage object', function () {
      expect(pulldown.state.currentStage.name).toBe(defaultStageName);
    });

    it('sets its height according to the current stage height', function () {
      var element = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(pulldown, 'div');

      expect(element.style.height).toBe(height + 'px');
    });

    it('fires the onChange callback', function () {
      pulldown._goTo(nextStageName);

      expect(onChange).toBeCalledWith(nextStageName);
    });

    it('fires the onClose callback', function () {
      pulldown._close();

      expect(onClose).toBeCalled();
    });

    it('disappears when closed', function () {
      pulldown._close();
      var element = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(pulldown, 'div');

      expect(element.style.marginTop).toBe('-' + height + 'px');
    });

    it('does not apply the open modifier when closed', function () {
      pulldown._close();
      var element = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(pulldown, 'div');

      expect(element.className).not.toContain(className + '--open');
    });

    it('fires the onOpen callback', function () {
      jest.runAllTimers();

      expect(onOpen).toBeCalled();
    });

    it('appears when open', function () {
      jest.runAllTimers();
      var element = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(pulldown, 'div');

      expect(element.style.marginTop).toBe('0');
    });

    it('applies the open modifier when open', function () {
      jest.runAllTimers();
      var element = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(pulldown, 'div');

      expect(element.className).toContain(className + '--open');
    });

    it('waits for the delay to appear', function () {
      var element = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(pulldown, 'div');
      expect(element.style.marginTop).toBe('-' + height + 'px');

      jest.runAllTimers();
      expect(element.style.marginTop).toBe('0');
    });
  });

  describe('fixed', function () {
    beforeEach(function () {
      pulldown = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
        Pulldown,
        {
          defaultStage: defaultStageName,
          delay: delay,
          fixed: true
        },
        _react2.default.createElement(PulldownStage, { height: height, name: defaultStageName })
      ));
    });

    it('disappears when closed', function () {
      pulldown._close();
      var element = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(pulldown, 'div');

      expect(element.style.top).toBe('-100%');
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
});