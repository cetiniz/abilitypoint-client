import React from 'react';

const NodeMap = (props) => (
    fetch(props.api).then(res => {
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
/* 
else if (props.api == '/api') {
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
else {props.api = '/all/api'} */
)

export default NodeMap;