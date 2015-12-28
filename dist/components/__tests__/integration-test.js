'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('shallowequal');
jest.dontMock('../pulldown');
jest.dontMock('../pulldown-stage');

var Pulldown = require('../pulldown').default;
var PulldownStage = require('../pulldown-stage').default;

describe('Pulldown', function () {
  it('updates its height when the current stage height changes', function () {
    var Parent = _react2.default.createClass({
      displayName: 'Parent',
      getInitialState: function getInitialState() {
        return {
          height: 100
        };
      },
      render: function render() {
        var height = this.state.height;

        return _react2.default.createElement(
          Pulldown,
          {
            className: 'pulldown',
            defaultStage: 'a'
          },
          _react2.default.createElement(PulldownStage, {
            height: height,
            name: 'a'
          })
        );
      }
    });
    var parent = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(Parent, null));
    var pulldown = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithClass(parent, 'pulldown');

    expect(pulldown.style.height).toBe('100px');
    parent.setState({
      height: 200
    });
    expect(pulldown.style.height).toBe('200px');
  });
});