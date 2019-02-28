import React, { Component } from 'react';
import * as d3 from 'd3';
import { select } from 'd3-selection';
import { drag } from 'd3-drag';
import { zoom } from 'd3-zoom';
import { forceManyBody, forceSimulation, forceCenter, forceLink } from 'd3-force';

class Network extends Component {
  state = {
    node: null,
    link: null,
  };

  componentDidMount() { //initial render
    this.renderNodeNetwork();
  }

  componentDidUpdate(prevProps) { //if props change
    if (this.props.nodes !== prevProps.nodes){
    debugger
    
    this.deleteNodeNetwork();
    this.renderNodeNetwork();
    }
  }

  deleteNodeNetwork() {    //unmounts window
    const { node, zoomWindow } = this.state;

      node.remove();
      zoomWindow.remove();
  }

  renderNodeNetwork() {  //mounts window
    const svg = select("svg"),
      width = +svg.attr("width"),
      height = +svg.attr("height");
      svg.style("border", "1px solid white")
    const simulation = forceSimulation().nodes(this.props.nodes);
    simulation.force("charge_force", forceManyBody())
      .force("center_force", forceCenter(width / 2, height / 2));
    const zoomWindow = svg.append("g")
        .attr("class", "everything");
    const node = zoomWindow.append("g")
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
        .attr('y', 3)
        .style('font-size', 12)
        .style('fill', 'white');
    node.append("title")
        .text(function(d) { return d.name; });
    const link_force =  forceLink(this.props.edges)
        .id(function(d) { return d.Name; });
    simulation.force("links", link_force);
    const link = zoomWindow.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(this.props.edges)
        .enter().append("line")
        .attr("stroke-width", 2);

    const charge_force = forceManyBody()
        .strength(-100);

    //add drag capabilities
    const drag_handler = drag()
        .on("start", drag_start)
        .on("drag", drag_drag)
        .on("end", drag_end);

    const zoom_handler = zoom()
        .on("zoom", zoom_actions);

    function drag_start(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

//make sure you can't drag the circle outside the box
    function drag_drag(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function drag_end(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    //Zoom functions
    function zoom_actions(){
      zoomWindow.attr("transform", d3.event.transform)
    }

    zoom_handler(svg);
    drag_handler(node);

    simulation
        .force("charge_force", charge_force)
        .force("links",link_force)
        .nodes(this.props.nodes)
        .on("tick", () => this.tickActions(node, link) );

    window.node = node;
    window.link = link;
    window.zoomWindow = zoomWindow;
    this.setState({ node, zoomWindow });
    //this.forceUpdate()
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
  render() {
    return (
        <svg width="960" height="600" />
        

    );
  }
}

export default Network;

