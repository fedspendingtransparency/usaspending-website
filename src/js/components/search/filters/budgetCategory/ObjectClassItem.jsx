/**
 * ObjectClassItem.jsx
 * Created by michaelbray on 3/20/17.
 */

import React from 'react';

const propTypes = {
    objectClasses: React.PropTypes.object,
    objectClassLabel: React.PropTypes.string,
    objectClassID: React.PropTypes.number,
    toggleSelection: React.PropTypes.func
};

const defaultProps = {
    objectClasses: {},
    objectClassLabel: "",
    objectClassID: 0
};

export default class ObjectClassItem extends React.Component {
    render() {
        const checked = this.props.objectClasses.has(`${this.props.objectClassID}`);

        return (
            <li className="object-class-set">
                <div className="award-type-item-wrapper">
                    <input
                        type="checkbox"
                        id={`object-class-${this.props.objectClassID}`}
                        value={this.props.objectClassID}
                        checked={checked}
                        onChange={this.props.toggleSelection.bind(this)} />
                    <label htmlFor={`object-class-${this.props.objectClassID}`}>
                        {this.props.objectClassLabel}</label>
                </div>
            </li>
        );
    }
}

ObjectClassItem.propTypes = propTypes;
ObjectClassItem.defaultProps = defaultProps;
