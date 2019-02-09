import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import TextField from "@material-ui/core/es/TextField/TextField";
import Paper from "@material-ui/core/es/Paper/Paper";
import Typography from "@material-ui/core/es/Typography/Typography";
import Textarea from "@material-ui/core/es/InputBase/Textarea";
import Button from "@material-ui/core/es/Button/Button";

class NodeCreator extends Component {
    constructor(props) {
        super(props);

        this.fileInput = React.createRef();
    }
    state = {
        nodeType: '',
        name: '',
        description: '',
    };

    handleFileClick = e => {
        this.fileInput.current.click();
    };

    setFactory = state => e => {
        this.setState({ [state]: e.target.value });
    };

    createNode = () => {
        const { nodeType, name, description } = this.state;

        const payload = {
            name,
            description,
        };

        fetch(`/api/node?type=${nodeType}`, {
            method: 'post',
            body: JSON.stringify(payload)
        })
    }

    render() {
        const { nodeType, name, description } = this.state;

        return (
            <Paper elevation={1} style={{ padding: 16, display: 'flex', flexDirection: 'column', position: 'absolute', top: 80, left: 80 }}>
                <Typography>Create a new Node!</Typography>
                <Typography align={'left'}>Type</Typography>
                <Select value={nodeType} onChange={({ target }) => this.setState({ nodeType: target.value })} style={{ marginBottom: 16 }}>
                    <MenuItem value={'domain'}>Domain</MenuItem>
                    <MenuItem value={'subject'}>Subject</MenuItem>
                    <MenuItem value={'skill'}>Skill</MenuItem>
                    <MenuItem value={'fact'}>Fact</MenuItem>
                    <MenuItem value={'person'}>Person</MenuItem>
                </Select>
                <Typography align={'left'}>Name</Typography>
                <TextField variant="outlined" onChange={this.setFactory('name')} value={name} />
                <Typography align={'left'}>Description</Typography>
                <TextField multiline variant="outlined" onChange={this.setFactory('description')} value={description} />

                <Button
                    onClick={this.handleFileClick}
                    containerElement='label' // <-- Just add me!
                    label='My Label'>
                    <Typography>Add Photo</Typography>
                    <input ref={this.fileInput} type="file" style={{ visibility: 'hidden' }}/>
                </Button>
                <Button onClick={this.createNode} style={{ border: '1px solid gainsboro' }}>
                    Submit Node!
                </Button>
            </Paper>
        );
    }
}

NodeCreator.propTypes = {};

export default NodeCreator;
