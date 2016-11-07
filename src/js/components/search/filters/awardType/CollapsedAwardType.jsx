/**
 * collapsedAwardType.jsx
 * Created by Emily Gullo 11/02/2016
 **/

import React from 'react';
import * as Icons from 'components/sharedComponents/icons/Icons';

const defaultProps = {
    id: '',
    name: ''
};

const propTypes = {
    id: React.PropTypes.string,
    click: React.PropTypes.func,
    name: React.PropTypes.string
};

export default class CollapsedAwardType extends React.Component {

    render() {
        return (
            <div className="primaryAwardTypeOption">
                <input type="checkbox" id={this.props.id} value={this.props.name} />
                <label htmlFor={this.props.id}>{this.props.name}</label>
                <a className="toggle" href="#null" onClick={this.props.click}>
                    <Icons.AngleDown />
                </a>
            </div>
        );
    }
}

CollapsedAwardType.propTypes = propTypes;
CollapsedAwardType.defaultProps = defaultProps;
