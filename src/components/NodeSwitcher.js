import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import TextField from "@material-ui/core/es/TextField/TextField";
import Paper from "@material-ui/core/es/Paper/Paper";
import Typography from "@material-ui/core/es/Typography/Typography";
import Textarea from "@material-ui/core/es/InputBase/Textarea";
import Button from "@material-ui/core/es/Button/Button";

/* import React from 'react';
import LazyLoad from 'react-lazyload';
import './Card.css';

const Card = (props) =>  (
  <LazyLoad height={650} offset={-100}>
    <div className={props.card.animation}>
      <div className="front" onClick={() => props.showBack(props.card)}>
        <img src="juice.jpg" alt="Avatar" className="card-image" />
        <div className="container">
          <h3>Vitamin Juice <span className="price">$24.99</span></h3> 
          <p>Need a jump on your vitamins while drinking? Tired of popping the pills? 
            Drink our vitamin enhanced juice, available in several flavours.</p>
        </div>
      </div>
      <div className="container-back back" onClick={() => props.showFront(props.card)}>
        <h3>Vitamin Juice <span className="price">$24.99</span></h3>
        <p>{props.card.description}</p>
      </div>
    </div>
  </LazyLoad>
);

export default Card; */

function e(props, target) {
  props.setApi(target.value);
  props.fetchNodes(target.value);
}

const NodeSwitcher = (props) => (

  

  <Paper elevation={1} style={{ padding: 8, display: 'flex', flexDirection: 'column', position: 'absolute', top: 80, right: 40 }}>
      <Typography>What Node Setting Would You Like?</Typography>
      <Typography align={'left'}>Type</Typography>
      <Select value={props.api} onChange={({ target }) => e(props, target)} style={{ marginBottom: 16 }}>
          <MenuItem value={'/api'}  >/api</MenuItem>
          <MenuItem value={'/api/all'}  >/api/all</MenuItem>
      </Select>
  </Paper>
);

/* 
 const NodeSwitcher = () => {
    <Paper elevation={1} style={{ padding: 8, display: 'flex', flexDirection: 'column', position: 'absolute', top: 80, right: 40 }}>
    <Typography>What Node Setting Would You Like?</Typography>
    <Typography align={'left'}>Type</Typography>
    <Select value={this.state} onChange={({ target }) => this.setState({ nodeSet: target.value })} style={{ marginBottom: 16 }}>
        <MenuItem value={'/api'}>/api</MenuItem>
        <MenuItem value={'/api/all'}>/api/all</MenuItem>
    </Select>
    <Typography align={'left'}>Name</Typography>
    <Button onClick={this.setNode} style={{ border: '1px solid gainsboro' }}>
        Submit Node!
    </Button>
</Paper>

 } */

export default NodeSwitcher;