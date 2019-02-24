import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Network from './Network.js';
import NodeCreator from "./NodeCreator";
import NodeSwitcher from "./components/NodeSwitcher";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nodes: null,
      edges: null,
      api: '/api/all',
    };

    this.setApi = this.setApi.bind(this);
    this.fetchNodes = this.fetchNodes.bind(this);
  }

/*   componentDidMount() {
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
  } */

  fetchNodes = (api) => {
    fetch(api).then(res => {
      res.json().then(json => {
        const nodes = [];
        const addedNodes = new Set();
          json.forEach(node => {
            if (!addedNodes.has(node.Name)) {
              nodes.push(node);
              addedNodes.add(node.Name)
            }
          });
        this.setState({ nodes });
      })
    })
  }

  componentDidMount() {

    fetch(this.state.api).then(res => {
      res.json().then(json => {
        const nodes = [];
        const addedNodes = new Set();
          json.forEach(node => {

            if (!addedNodes.has(node.Name)) {
              nodes.push(node);
              addedNodes.add(node.Name)
            }
          });
        this.setState({ nodes });
      })
    })

  }

  setNodeData = (nodes) => {
    this.setState({ nodes });
  }

  setApi = (api) => {
    this.setState({api});
  }

  render() {
    const { nodes, edges, api, } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          {nodes && (
          <Network nodes={nodes} edges={edges || []}/>
          )}
          <NodeCreator />
          {
            <NodeSwitcher api={api} setApi={this.setApi} fetchNodes={this.fetchNodes} />
            }
            {api}
            (<div><pre>{JSON.stringify(nodes, null, 2) }</pre></div>
        </header>
      </div>
    );
  }
}

export default App;
