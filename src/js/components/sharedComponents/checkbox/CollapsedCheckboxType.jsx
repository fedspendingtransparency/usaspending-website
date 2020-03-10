/**
 * CollapsedCheckboxType.jsx
 * Created by michaelbray on 5/18/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import CheckboxExpandButton from './CheckboxExpandButton';

const defaultProps = {
    id: `checkbox-${uniqueId()}`,
    name: '',
    selected: false,
    hideArrow: true,
    arrowState: 'collapsed',
    isCollapsable: true
};

const propTypes = {
    id: PropTypes.string,
    toggleExpand: PropTypes.func,
    toggleChildren: PropTypes.func,
    name: PropTypes.string,
    selected: PropTypes.bool,
    hideArrow: PropTypes.bool,
    arrowState: PropTypes.string,
    isCollapsable: PropTypes.bool
};

export default class CollapsedCheckboxType extends React.Component {
    render() {
        const elementId = `checkbox-${uniqueId()}`;
        return (
            <div className="primary-checkbox-type">
                <div className="checkbox-type-item-wrapper">
                    {
                        this.props.isCollapsable &&
                        <CheckboxExpandButton
                            hidden={this.props.hideArrow}
                            toggleExpand={this.props.toggleExpand}
                            arrowState={this.props.arrowState} />
                    }
                    <label
                        className="checkbox-item-wrapper"
                        htmlFor={elementId}>
                        <input
                            type="checkbox"
                            id={elementId}
                            value={this.props.name}
                            checked={this.props.selected}
                            onChange={this.props.toggleChildren} />
                        <span className="checkbox-item-label">
                            {this.props.name}
                        </span>
                    </label>
                </div>
            </div>
        );
    }
}

CollapsedCheckboxType.propTypes = propTypes;
CollapsedCheckboxType.defaultProps = defaultProps;
