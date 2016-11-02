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
        return (
            <div className="primaryAwardTypeOption">
                <input type="checkbox" id={this.props.name} value={this.props.name} />
                <label htmlFor={this.props.name}>{this.props.name}</label>
                <a className="toggle" href="#null" onClick={this.props.click}>
                    <Icons.AngleDown />
                </a>
            </div>
        );
    }
}
CollapsedAwardType.propTypes = propTypes;
