/**
 * ShownAgency.jsx
 * Created by Emily Gullo 12/28/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';
import ShownValue from '../otherFilters/ShownValue';

const propTypes = {
    agency: PropTypes.object,
    toggleAgency: PropTypes.func,
    label: PropTypes.string,
    agencyType: PropTypes.string
};

export default class ShownAgency extends React.Component {
    constructor(props) {
        super(props);

        this.toggleAgency = this.toggleAgency.bind(this);
    }

    toggleAgency() {
        this.props.toggleAgency(this.props.agency, true, this.props.agencyType);
    }

    render() {
        return (
            <ShownValue label={this.props.label} removeValue={this.toggleAgency} />
        );
    }
}
ShownAgency.propTypes = propTypes;
