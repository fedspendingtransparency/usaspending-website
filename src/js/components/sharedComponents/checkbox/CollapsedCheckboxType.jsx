/**
 * CollapsedCheckboxType.jsx
 * Created by michaelbray on 5/18/17.
 */

import React from 'react';
import CheckboxExpandButton from './CheckboxExpandButton';

const defaultProps = {
    id: '',
    name: '',
    selected: false,
    hideArrow: true,
    arrowState: 'collapsed'
};

const propTypes = {
    id: React.PropTypes.string,
    toggleExpand: React.PropTypes.func,
    toggleChildren: React.PropTypes.func,
    name: React.PropTypes.string,
    selected: React.PropTypes.bool,
    hideArrow: React.PropTypes.bool,
    arrowState: React.PropTypes.string
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
