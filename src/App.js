import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Network from './Network.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nodes: null,
      edges: null,
    };
  }

  componentDidMount() {
    fetch('/api').then(res => {
      res.json().then(json => {
        const edges = [];
        const nodes = [];
        const addedNodes = new Set();
          json.forEach(node => {
              const edge = {
                source: node.From.Name,
                target: node.To.Name,
              };
              edges.push(edge);
              if (!addedNodes.has(node.From.Name)) {
                  nodes.push(node.From);
                  addedNodes.add(node.From.Name)
              }
            if (!addedNodes.has(node.To.Name)) {
              nodes.push(node.To);
              addedNodes.add(node.To.Name)
            }
          });
        this.setState({ nodes, edges });
      })
    })
  }

  setNodeData = (nodes) => {
    this.setState({ nodes });
  }

  render() {
    const { nodes, edges } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          {nodes && (
          <Network nodes={nodes} edges={edges}/>
          )}
        </header>
      </div>
    );
  }
}

export default App;
