/**
 * ShownAgency.jsx
 * Created by Emily Gullo 12/28/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from 'components/sharedComponents/icons/Icons';

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
            <button
                className="shown-filter-button"
                value={this.props.label}
                onClick={this.toggleAgency}>
                <span className="close">
                    <Icons.Close className="usa-da-icon-close" />
                </span> {this.props.label}
            </button>
        );
    }
}
ShownAgency.propTypes = propTypes;
