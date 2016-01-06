import React from 'react';
import ReactDOM from 'react-dom';
import {PulldownClose, PulldownGoto, PulldownStage, Pulldown} from '../dist';

const App = React.createClass({

  getInitialState() {
    return {
      closed: false,
      countdown: 3,
    };
  },

  componentDidMount() {
    const interval = setInterval(() => {
      const {countdown} = this.state;

      if (countdown > 0) {
        this.setState({
          countdown: countdown - 1,
        });
      } else {
        clearTimeout(interval);
      }
    }, 1000);
  },

  _handleClose() {
    this.setState({
      closed: true,
    });
  },

  _renderCountdown() {
    const {countdown} = this.state;

    return (
      <p className="countdown">
        The pulldown will appear in
        <span className="countdown__counter">
          {countdown}s
        </span>
      </p>
    );
  },

  _renderCredits() {
    return (
      <div className="credits">
        <a href="/">
          Restart
        </a>
        <div className="credits__divider" />
        <a href="https://github.com/YPlan/react-pulldown">
          Fork me on Github
        </a>
        <div className="credits__divider" />
        <p className="credits__author">
          Made with ❤ by <a href="https://yplanapp.com">YPlan</a>
        </p>
      </div>
    );
  },

  render() {
    const {closed, countdown} = this.state;

    return (
      <div>
        {countdown > 0 && this._renderCountdown()}
        {closed && this._renderCredits()}

        <Pulldown
          className="pulldown"
          defaultStage="a"
          delay={3000}
          fixed
          onClose={this._handleClose}
        >

          <PulldownStage
            className="pulldown__stage"
            height={150}
            name="a"
          >
            <div>
              The
              <PulldownGoto
                className="pulldown__button"
                stage="b"
              >
                next
              </PulldownGoto>
              stage will come from the top
            </div>
          </PulldownStage>

          <PulldownStage
            className="pulldown__stage"
            direction="top"
            height={150}
            name="b"
          >
            <div>
              The
              <PulldownGoto
                className="pulldown__button"
                stage="c"
              >
                next
              </PulldownGoto>
              one from the bottom
            </div>
          </PulldownStage>

          <PulldownStage
            className="pulldown__stage"
            direction="bottom"
            height={150}
            name="c"
          >
            <div>
              The
              <PulldownGoto
                className="pulldown__button"
                stage="d"
              >
                next
              </PulldownGoto>
              one is gonna be bigger
            </div>
          </PulldownStage>

          <PulldownStage
            className="pulldown__stage"
            direction="top"
            height={300}
            name="d"
          >
            <div>
              The
              <PulldownGoto
                className="pulldown__button"
                stage="e"
              >
               last
              </PulldownGoto>
              one is smaller
            </div>
          </PulldownStage>

          <PulldownStage
            className="pulldown__stage"
            direction="bottom"
            height={75}
            name="e"
          >
            <div>
              See ya!
              <PulldownClose
                className="pulldown__button"
              >
                Close
              </PulldownClose>
            </div>
          </PulldownStage>

        </Pulldown>
      </div>
    );
  },

});

ReactDOM.render(<App />, document.getElementById('app'));
