/**
 * ShownNAICS.jsx
 * Created by Emily Gullo 07/14/2017
 **/

import React from 'react';
import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    removeNAICS: React.PropTypes.func,
    label: React.PropTypes.string
};

export default class ShownNAICS extends React.Component {

    render() {
        return (
            <button
                className="shown-filter-button"
                value={this.props.label}
                onClick={this.props.removeNAICS}>
                <span className="close">
                    <Icons.Close className="usa-da-icon-close" />
                </span> {this.props.label}
            </button>
        );
    }
}
ShownNAICS.propTypes = propTypes;
