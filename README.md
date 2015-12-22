[![Build Status](https://travis-ci.org/YPlan/react-pulldown.svg?branch=master)](https://travis-ci.org/YPlan/react-pulldown)

React Pulldown
==============

A Pulldown component for [React.js](http://facebook.github.io/react/)

Installation
------------

```sh
$ npm install react-pulldown --save
```

Demo
----

[https://react-pulldown.herokuapp.com/](https://react-pulldown.herokuapp.com/)

Usage
-----

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import {PulldownClose, PulldownGoto, PulldownStage, Pulldown} from 'react-pulldown';

const App = React.createClass({

  render() {
    return (
      <Pulldown
        className="demo"
        defaultStage="a"
        delay={1000}
      >

        <PulldownStage
          height={100}
          name="a"
          position="top"
        >
          First stage
          <PulldownGoto
            stage="b"
          >
            Next
          </PulldownGoto>
        </PulldownStage>

        <PulldownStage
          className="stage-b"
          height={200}
          name="b"
          position="top"
        >
          Second stage
          <PulldownClose>
            Close
          </PulldownClose>
        </PulldownStage>

      </Pulldown>
    );
  },

});

ReactDOM.render(<App />, document.getElementById('app'));
```

Test
----

```sh
$ npm test
```
