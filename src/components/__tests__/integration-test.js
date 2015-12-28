jest.dontMock('shallowequal');
jest.dontMock('../pulldown');
jest.dontMock('../pulldown-stage');

import React from 'react';
import TestUtils from 'react-addons-test-utils';

const Pulldown = require('../pulldown').default;
const PulldownStage = require('../pulldown-stage').default;

describe('Pulldown', () => {
  it('updates its height when the current stage height changes', () => {
    const Parent = React.createClass({
      getInitialState() {
        return {
          height: 100,
        };
      },
      render() {
        const {height} = this.state;
        return (
          <Pulldown
            className="pulldown"
            defaultStage="a"
          >
            <PulldownStage
              height={height}
              name="a"
            />
          </Pulldown>
        );
      },
    });
    const parent = TestUtils.renderIntoDocument(<Parent />);
    const pulldown = TestUtils.findRenderedDOMComponentWithClass(parent, 'pulldown');

    expect(pulldown.style.height).toBe('100px');
    parent.setState({
      height: 200,
    });
    expect(pulldown.style.height).toBe('200px');
  });
});
