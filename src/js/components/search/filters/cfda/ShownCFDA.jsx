/**
 * ShownLocation.jsx
 * Created by Emily Gullo 07/10/2017
 **/

import React from 'react';
import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    removeCFDA: React.PropTypes.func,
    label: React.PropTypes.string
};

export default class ShownCFDA extends React.Component {

    render() {
        return (
            <button
                className="shown-filter-button"
                value={this.props.label}
                onClick={this.props.removeCFDA}>
                <span className="close">
                    <Icons.Close className="usa-da-icon-close" />
                </span> {this.props.label}
            </button>
        );
    }
}
ShownCFDA.propTypes = propTypes;
