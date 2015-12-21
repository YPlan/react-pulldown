jest.dontMock('../pulldown');

import React from 'react';
import TestUtils from 'react-addons-test-utils';

const Pulldown = require('../pulldown').default;
const PulldownStage = require('../pulldown-stage').default;

describe('Pulldown', () => {
  const className = 'className';
  const onChange = jest.genMockFunction();
  const onClose = jest.genMockFunction();
  const onOpen = jest.genMockFunction();
  const stageName = 'b';
  let pulldown;

  beforeEach(() => {
    pulldown = TestUtils.renderIntoDocument(
      <Pulldown
        className={className}
        defaultStage="a"
        delay={1000}
        onChange={onChange}
        onClose={onClose}
        onOpen={onOpen}
      >
        <PulldownStage name="a" />
        <PulldownStage name={stageName} />
      </Pulldown>
    );
  });

  it('applies the class name', () => {
    const element = TestUtils.findRenderedDOMComponentWithTag(pulldown, 'div');

    expect(element.className).toBe(className);
  });

  it('fires the onChange callback', () => {
    pulldown._goTo(stageName);

    expect(onChange).toBeCalledWith(stageName);
  });

  it('fires the onClose callback', () => {
    pulldown._close();

    expect(onClose).toBeCalled();
  });

  it('disappear when closed', () => {
    pulldown._close();
    const element = TestUtils.findRenderedDOMComponentWithTag(pulldown, 'div');

    expect(element.style.top).toBe('-100%');
  });

  it('fires the onOpen callback', () => {
    jest.runAllTimers();

    expect(onOpen).toBeCalled();
  });

  it('appears when open', () => {
    jest.runAllTimers();
    const element = TestUtils.findRenderedDOMComponentWithTag(pulldown, 'div');

    expect(element.style.top).toBe('0px');
  });

  it('waits for the delay to appear', () => {
    const element = TestUtils.findRenderedDOMComponentWithTag(pulldown, 'div');
    expect(element.style.top).toBe('-100%');

    jest.runAllTimers();
    expect(element.style.top).toBe('0px');
  });
});
