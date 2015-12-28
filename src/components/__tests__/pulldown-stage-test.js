/* eslint react/no-multi-comp:0 */

jest.dontMock('shallowequal');
jest.dontMock('../pulldown-stage');

import React from 'react';
import TestUtils from 'react-addons-test-utils';

const PulldownStage = require('../pulldown-stage').default;

function createFakeContext(childContext) {
  return React.createClass({
    propTypes: {
      children: React.PropTypes.element,
    },
    childContextTypes: {
      currentStage: React.PropTypes.object,
      previousStage: React.PropTypes.object,
      update: React.PropTypes.func,
    },
    getChildContext() {
      return childContext;
    },
    render() {
      return <div>{this.props.children}</div>;
    },
  });
}

describe('PulldownStage', () => {
  let FakeContext;
  let pulldownStage;

  describe('current stage', () => {
    beforeEach(() => {
      FakeContext = createFakeContext({
        currentStage: {
          name: 'currentStage',
        },
      });

      pulldownStage = TestUtils.renderIntoDocument(
        <FakeContext>
          <PulldownStage
            className="className"
            height={100}
            name="currentStage"
          />
        </FakeContext>
      );
    });

    it('applies the class modifier', () => {
      const element = TestUtils.scryRenderedDOMComponentsWithTag(pulldownStage, 'div')[1];

      expect(element.className).toContain('className--active');
    });

    it('sets the top to zero', () => {
      const element = TestUtils.scryRenderedDOMComponentsWithTag(pulldownStage, 'div')[1];

      expect(element.style.top).toBe('0px');
    });
  });

  describe('previous stage (top)', () => {
    beforeEach(() => {
      FakeContext = createFakeContext({
        currentStage: {
          direction: 'top',
          height: 100,
          name: 'currentStage',
        },
        previousStage: {
          name: 'previousStage',
        },
      });

      pulldownStage = TestUtils.renderIntoDocument(
        <FakeContext>
          <PulldownStage
            height={100}
            name="previousStage"
          />
        </FakeContext>
      );
    });

    it('sets the top to height', () => {
      const element = TestUtils.scryRenderedDOMComponentsWithTag(pulldownStage, 'div')[1];

      expect(element.style.top).toBe('100px');
    });
  });

  describe('previous stage (bottom)', () => {
    beforeEach(() => {
      FakeContext = createFakeContext({
        currentStage: {
          direction: 'bottom',
          height: 100,
          name: 'currentStage',
        },
        previousStage: {
          name: 'previousStage',
        },
      });

      pulldownStage = TestUtils.renderIntoDocument(
        <FakeContext>
          <PulldownStage
            height={100}
            name="previousStage"
          />
        </FakeContext>
      );
    });

    it('sets the top to negative height', () => {
      const element = TestUtils.scryRenderedDOMComponentsWithTag(pulldownStage, 'div')[1];

      expect(element.style.top).toBe('-100px');
    });
  });

  describe('stage', () => {
    beforeEach(() => {
      FakeContext = createFakeContext({
        currentStage: {},
      });

      pulldownStage = TestUtils.renderIntoDocument(
        <FakeContext>
          <PulldownStage
            className="className"
            height={100}
            name="name"
          />
        </FakeContext>
      );
    });

    it('applies the class name', () => {
      const element = TestUtils.scryRenderedDOMComponentsWithTag(pulldownStage, 'div')[1];

      expect(element.className).toContain('className');
    });
  });

  describe('stage (height > currentStage height)', () => {
    beforeEach(() => {
      FakeContext = createFakeContext({
        currentStage: {
          height: 100,
        },
      });

      pulldownStage = TestUtils.renderIntoDocument(
        <FakeContext>
          <PulldownStage
            direction="top"
            height={101}
            name="name"
          />
        </FakeContext>
      );
    });

    it('sets the top to the maximum height', () => {
      const element = TestUtils.scryRenderedDOMComponentsWithTag(pulldownStage, 'div')[1];

      expect(element.style.top).toBe('-101px');
    });
  });

  describe('stage (height < currentStage height)', () => {
    beforeEach(() => {
      FakeContext = createFakeContext({
        currentStage: {
          height: 101,
        },
      });

      pulldownStage = TestUtils.renderIntoDocument(
        <FakeContext>
          <PulldownStage
            direction="top"
            height={100}
            name="name"
          />
        </FakeContext>
      );
    });

    it('sets the top to the maximum height', () => {
      const element = TestUtils.scryRenderedDOMComponentsWithTag(pulldownStage, 'div')[1];

      expect(element.style.top).toBe('-101px');
    });
  });

  describe('stage (top)', () => {
    beforeEach(() => {
      FakeContext = createFakeContext({
        currentStage: {
          height: 100,
        },
      });

      pulldownStage = TestUtils.renderIntoDocument(
        <FakeContext>
          <PulldownStage
            direction="top"
            height={100}
            name="name"
          />
        </FakeContext>
      );
    });

    it('sets the top to the negative height', () => {
      const element = TestUtils.scryRenderedDOMComponentsWithTag(pulldownStage, 'div')[1];

      expect(element.style.top).toBe('-100px');
    });
  });

  describe('stage (bottom)', () => {
    beforeEach(() => {
      FakeContext = createFakeContext({
        currentStage: {
          height: 100,
        },
      });

      pulldownStage = TestUtils.renderIntoDocument(
        <FakeContext>
          <PulldownStage
            direction="bottom"
            height={100}
            name="name"
          />
        </FakeContext>
      );
    });

    it('sets the top to the height', () => {
      const element = TestUtils.scryRenderedDOMComponentsWithTag(pulldownStage, 'div')[1];

      expect(element.style.top).toBe('100px');
    });
  });

  describe('update', () => {
    function createParent(childContext) {
      FakeContext = createFakeContext(childContext);
      return React.createClass({
        getInitialState() {
          return {
            height: 100,
          };
        },
        render() {
          const {height} = this.state;
          return (
            <FakeContext>
              <PulldownStage
                height={height}
                name="a"
              />
            </FakeContext>
          );
        },
      });
    }

    it('fires the callback if is current and props change', () => {
      const update = jest.genMockFunction();
      const Parent = createParent({
        currentStage: {
          name: 'a',
        },
        update,
      });
      const parent = TestUtils.renderIntoDocument(<Parent />);
      parent.setState({
        height: 200,
      });

      expect(update).toBeCalled();
    });

    it('does not fire the callback if is current and props do not change', () => {
      const update = jest.genMockFunction();
      const Parent = createParent({
        currentStage: {
          name: 'a',
        },
        update,
      });
      const parent = TestUtils.renderIntoDocument(<Parent />);
      parent.setState({
        height: 100,
      });

      expect(update).not.toBeCalled();
    });

    it('does not fire the callback if is not current', () => {
      const update = jest.genMockFunction();
      const Parent = createParent({
        currentStage: {
          name: 'b',
          height: 100,
        },
        update,
      });
      const parent = TestUtils.renderIntoDocument(<Parent />);
      parent.setState({
        height: 200,
      });

      expect(update).not.toBeCalled();
    });
  });
});
