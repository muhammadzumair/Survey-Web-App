import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        flexGrow: 1,
        // colorPrimary: 'red'
    },
    barColorPrimary: {
        backgroundColor: 'red',
        background: 'red',
        color: 'red'
    }
};

class ProgressBar extends React.Component {

    state = {
        completed: 0,
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={{ root: classes.root, colorPrimary: classes.barColorPrimary }}>
                <LinearProgress color={this.props.color} style={this.props.style} variant="determinate" value={this.props.value} />
            </div>
        );
    }
}

ProgressBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProgressBar);