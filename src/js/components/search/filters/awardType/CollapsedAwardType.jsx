/**
 * collapsedAwardType.jsx
 * Created by Emily Gullo 11/02/2016
 **/

import React from 'react';
import * as Icons from '../../../sharedComponents/icons/Icons';

const propTypes = {
    click: React.PropTypes.func,
    name: React.PropTypes.string
};

export default class CollapsedAwardType extends React.Component {

    render() {
        const nameShort = this.props.name.replace(/\s+/g, '').toLowerCase();
        return (
            <div className="primaryAwardTypeOption">
                <input type="checkbox" id={nameShort} value={this.props.name} />
                <label htmlFor={nameShort}>{this.props.name}</label>
                <a className="toggle" href="#null" onClick={this.props.click}>
                    <Icons.AngleDown />
                </a>
            </div>
        );
    }
}
CollapsedAwardType.propTypes = propTypes;
