import React, {Component} from 'react';
import './App.css';


let [GRAY, RED, BLUE] = ['gray', 'red', 'blue'];
let [ROUNDS, BOARD, ALPHA] = [10, 10, .6];

function range(size) {
  return Array.from(Array(size).keys());
}

function choose(arr, n) {
  for (var i = arr.length; i > 0; i--) {
    let pick = Math.floor(Math.random() * i);
    [arr[i-1], arr[pick]] = [arr[pick], arr[i-1]];
  }
  return arr.slice(0, n);
}

function Slush(idx, cluster) {
  let value = GRAY;
  let listeners = [];
  let evt = 0;

  let me = {
    query: function (newValue) {
      if (value == GRAY) {
        value = newValue;
        listeners.forEach(l => l.onPropose(value))
        me.decide(0);
      }
      return value;
    },
    decide: function(round) {
      if (round >= ROUNDS) {
        listeners.forEach(l => l.onAccept(value));
        return;
      }

      let loop = () => {
        let results = choose(cluster, BOARD).map(e => e.query(value));
        for (var c of [RED, BLUE]) {
          let count = results.filter(v => v == c).length;
          if (count > ALPHA * BOARD) {
            value = c;
          }
        }

        me.decide(round + 1);
      };

      // arbitrarily slow things
      let delay = Math.floor(Math.random() * 10);
      evt = setTimeout(loop, delay);

    },
    addListener: function(listener) {
      listeners.push(listener);
    },
    reset: function() {
      value = GRAY;
      clearTimeout(evt);
      listeners.forEach(l => l.onAccept(value));
    }
  };

  return me;
}

class Holder extends Component {

  constructor(props) {
    super(props);
    this.state = {color: GRAY};
    this.node = props.nodes[props.idx];
    this.node.addListener(this);
  }

  onPropose(value) {
    this.setState({color: value});
  }

  onAccept(value) {
    this.setState({color: value});
  }

  render() {
    return (
      <div className="circle" style={{backgroundColor: this.state.color}}></div>
    )
  }
}


class App extends Component {

  render() {
    let rng = range(1000);
    let nodes = [];
    for (var i of rng) {
      nodes.push(new Slush(i, nodes));
    }

    let colors = [RED, BLUE];

    let holders = rng
      .map(idx => <Holder key={idx} idx={idx} nodes={nodes}/>);

    let restart = () => {
      nodes.forEach(n => n.reset());
      choose(nodes, 2).map((n, i) => n.query(colors[i % 2]));
    };

    setTimeout(restart, 10);

    return (
      <div>
        {holders}

        <nav>
          <button onClick={restart}>restart</button>
        </nav>
      </div>
    );
  }
}

export default App;
