jest.dontMock('../pulldown-goto');

import React from 'react';
import TestUtils from 'react-addons-test-utils';

const PulldownGoto = require('../pulldown-goto').default;

describe('PulldownGoto', () => {
  const className = 'className';
  const stage = 'stage';
  let goTo;
  let pulldownGoto;

  beforeEach(() => {
    goTo = jest.genMockFunction();

    const FakeContext = React.createClass({
      propTypes: {
        children: React.PropTypes.element,
      },
      childContextTypes: {
        goTo: React.PropTypes.func,
      },
      getChildContext() {
        return {
          goTo,
        };
      },
      render() {
        return <div>{this.props.children}</div>;
      },
    });

    pulldownGoto = TestUtils.renderIntoDocument(
      <FakeContext>
        <PulldownGoto className={className} stage={stage} />
      </FakeContext>
    );
  });

  it('applies the class name', () => {
    const element = TestUtils.findRenderedDOMComponentWithTag(pulldownGoto, 'button');

    expect(element.className).toBe(className);
  });

  it('calls the callback when clicked', () => {
    const element = TestUtils.findRenderedDOMComponentWithTag(pulldownGoto, 'button');
    TestUtils.Simulate.click(element);

    expect(goTo).toBeCalledWith(stage);
  });
});
