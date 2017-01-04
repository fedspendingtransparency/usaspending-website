/**
* TypeaheadWarning.jsx
* Created by Kevin Li 7/14/16
**/

import React from 'react';
import * as Icons from './icons/Icons';

const defaultProps = {
    header: 'Unknown Location',
    description: 'You must select a location from the list that is provided as you type.'
};

const propTypes = {
    header: React.PropTypes.string,
    description: React.PropTypes.string
};

export default class TypeaheadWarning extends React.Component {
    render() {
        return (
            <div className="error-message" role="alert">
                <div className="error-title">
                    <Icons.ExclamationCircle />
                    <div className="heading">{this.props.header}</div>
                </div>
                <p className="message">{this.props.description}</p>
            </div>
        );
    }
}
TypeaheadWarning.defaultProps = defaultProps;
TypeaheadWarning.propTypes = propTypes;
