jest.dontMock('../pulldown');

import React from 'react';
import TestUtils from 'react-addons-test-utils';

const Pulldown = require('../pulldown').default;
const PulldownStage = require('../pulldown-stage').default;

describe('Pulldown', () => {
  const className = 'className';
  const defaultStageName = 'a';
  const nextStageName = 'b';
  const onChange = jest.genMockFunction();
  const onClose = jest.genMockFunction();
  const onOpen = jest.genMockFunction();
  let pulldown;

  beforeEach(() => {
    pulldown = TestUtils.renderIntoDocument(
      <Pulldown
        className={className}
        defaultStage={defaultStageName}
        delay={1000}
        onChange={onChange}
        onClose={onClose}
        onOpen={onOpen}
      >
        <PulldownStage height={100} name={defaultStageName} />
        <PulldownStage name={nextStageName} />
      </Pulldown>
    );
  });

  it('applies the class name', () => {
    const element = TestUtils.findRenderedDOMComponentWithTag(pulldown, 'div');

    expect(element.className).toBe(className);
  });

  it('sets the current stage object', () => {
    expect(pulldown.state.currentStage.name).toBe(defaultStageName);
  });

  it('sets its height according to the current stage height', () => {
    const element = TestUtils.findRenderedDOMComponentWithTag(pulldown, 'div');

    expect(element.style.height).toBe('100px');
  });

  it('fires the onChange callback', () => {
    pulldown._goTo(nextStageName);

    expect(onChange).toBeCalledWith(nextStageName);
  });

  it('fires the onClose callback', () => {
    pulldown._close();

    expect(onClose).toBeCalled();
  });

  it('disappears when closed', () => {
    pulldown._close();
    const element = TestUtils.findRenderedDOMComponentWithTag(pulldown, 'div');

    expect(element.style.top).toBe('-100%');
  });

  it('does not apply the open modifier when closed', () => {
    pulldown._close();
    const element = TestUtils.findRenderedDOMComponentWithTag(pulldown, 'div');

    expect(element.className).not.toContain(`${className}--open`);
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

  it('applies the open modifier when open', () => {
    jest.runAllTimers();
    const element = TestUtils.findRenderedDOMComponentWithTag(pulldown, 'div');

    expect(element.className).toContain(`${className}--open`);
  });

  it('waits for the delay to appear', () => {
    const element = TestUtils.findRenderedDOMComponentWithTag(pulldown, 'div');
    expect(element.style.top).toBe('-100%');

    jest.runAllTimers();
    expect(element.style.top).toBe('0px');
  });
});
