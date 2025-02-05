/**
 * ShownLocation.jsx
 * Created by Emily Gullo 12/08/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';
import ShownValue from '../otherFilters/ShownValue';

const propTypes = {
    removeLocation: PropTypes.func,
    label: PropTypes.string
};

export default class ShownLocation extends React.Component {
    render() {
        return (
            <ShownValue label={this.props.label} removeValue={this.props.removeLocation} />
        );
    }
}
ShownLocation.propTypes = propTypes;
