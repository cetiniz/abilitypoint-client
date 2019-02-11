import React, { Component } from 'react';
import { select } from 'd3-selection';
import { forceManyBody, forceSimulation, forceCenter, forceLink } from 'd3-force';

class Network extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const svg = select("svg"),
      width = +svg.attr("width"),
      height = +svg.attr("height");
    const simulation = forceSimulation().nodes(this.props.nodes);
    simulation.force("charge_force", forceManyBody())
      .force("center_force", forceCenter(width / 2, height / 2));
    const node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("g")
        .data(this.props.nodes)
        .enter().append("g");
    const circle = node
        .append("circle")
        .attr("r", 5)
        .attr("fill", "red");
    node.append("text")
        .text(function(d) {
          return d.Name;
        })
        .attr('x', 6)
        .attr('y', 3);
    node.append("title")
        .text(function(d) { return d.name; });
        const link_force =  forceLink(this.props.edges)
        .id(function(d) { return d.Name; });
    simulation.force("links", link_force);
   if (!link_force) {
    const link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(this.props.edges)
        .enter().append("line")
        .attr("stroke-width", 2);
    simulation
        .nodes(this.props.nodes)
        .on("tick", () => this.tickActions(node, link) );
      }
    simulation
      .nodes(this.props.nodes)
      .on("tick", () => this.tickAction(node) );
  }

  tickActions(node, link) {
    node
        .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        });
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
  }

  tickAction(node) {
    node
        .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        });
      }

  render() {
    return (
      <svg width="960" height="600" />
    );
  }
}

export default Network;

