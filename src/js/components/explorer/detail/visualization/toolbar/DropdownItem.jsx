/**
 * DropdownItem.jsx
 * Created by Kevin Li 8/17/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { icons } from 'dataMapping/explorer/dropdownScopes';
import { sidebarTypes } from 'dataMapping/explorer/sidebarStrings';

const propTypes = {
    value: PropTypes.string,
    pickItem: PropTypes.func
};

export default class DropdownItem extends React.Component {
    constructor(props) {
        super(props);

        this.clickedButton = this.clickedButton.bind(this);
    }

    clickedButton() {
        this.props.pickItem(this.props.value);
    }

    render() {
        const IconType = icons[this.props.value];
        const icon = <IconType />;
        const label = sidebarTypes[this.props.value];
        return (
            <li>
                <button
                    className="dropdown__option"
                    title={label}
                    onClick={this.clickedButton}>
                    <div className="dropdown__option-icon">
                        {icon}
                    </div>
                    <div className="dropdown__option-label">
                        {label}
                    </div>
                </button>
            </li>
        );
    }
}

DropdownItem.propTypes = propTypes;
