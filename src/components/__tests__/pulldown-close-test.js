jest.dontMock('../pulldown-close');

import React from 'react';
import TestUtils from 'react-addons-test-utils';

const PulldownClose = require('../pulldown-close').default;

describe('PulldownClose', () => {
  const className = 'className';
  let close;
  let pulldownClose;

  beforeEach(() => {
    close = jest.genMockFunction();

    const FakeContext = React.createClass({
      propTypes: {
        children: React.PropTypes.element,
      },
      childContextTypes: {
        close: React.PropTypes.func,
      },
      getChildContext() {
        return {
          close,
        };
      },
      render() {
        return <div>{this.props.children}</div>;
      },
    });

    pulldownClose = TestUtils.renderIntoDocument(
      <FakeContext>
        <PulldownClose className={className} />
      </FakeContext>
    );
  });

  it('applies the class name', () => {
    const element = TestUtils.findRenderedDOMComponentWithTag(pulldownClose, 'button');

    expect(element.className).toBe(className);
  });

  it('calls the callback when clicked', () => {
    const element = TestUtils.findRenderedDOMComponentWithTag(pulldownClose, 'button');
    TestUtils.Simulate.click(element);

    expect(close).toBeCalled();
  });
});
