/**
 * CollapsedCheckboxType.jsx
 * Created by michaelbray on 5/18/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import CheckboxExpandButton from './CheckboxExpandButton';

const defaultProps = {
    id: '',
    name: '',
    selected: false,
    hideArrow: true,
    arrowState: 'collapsed'
};

const propTypes = {
    id: PropTypes.string,
    toggleExpand: PropTypes.func,
    toggleChildren: PropTypes.func,
    name: PropTypes.string,
    selected: PropTypes.bool,
    hideArrow: PropTypes.bool,
    arrowState: PropTypes.string
};

export default class CollapsedCheckboxType extends React.Component {
    render() {
        return (
            <div className="primary-checkbox-type">
                <div className="checkbox-type-item-wrapper">
                    <CheckboxExpandButton
                        hidden={this.props.hideArrow}
                        toggleExpand={this.props.toggleExpand}
                        arrowState={this.props.arrowState} />
                    <input
                        type="checkbox"
                        id={this.props.id}
                        value={this.props.name}
                        checked={this.props.selected}
                        onChange={this.props.toggleChildren} />
                    <label htmlFor={this.props.id}>{this.props.name}</label>
                </div>
            </div>
        );
    }
}

CollapsedCheckboxType.propTypes = propTypes;
CollapsedCheckboxType.defaultProps = defaultProps;
