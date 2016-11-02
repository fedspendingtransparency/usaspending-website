/**
 * primaryAwardType.jsx
 * Created by Emily Gullo 11/02/2016
 **/

import React from 'react';
import * as Icons from '../../../sharedComponents/icons/Icons';
import SecondaryAwardType from './SecondaryAwardType';

const propTypes = {
    name: React.PropTypes.string,
    subList: React.PropTypes.array
};

export default class PrimaryAwardType extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showSubItems: false
        };
    }

    toggleSubItems() {
        if (this.state.showSubItems === false) {
            this.setState({ showSubItems: true });
        }
        else {
            this.setState({ showSubItems: false });
        }
    }

    render() {
        const primaryAwardList = (<div className="primaryAwardTypeOption">
            <input type="checkbox" id={this.props.name} value={this.props.name} />
            <label htmlFor={this.props.name}>{this.props.name}</label>
            <div className="toggle" onClick={this.toggleSubItems.bind(this)}>
                <Icons.AngleDown />
            </div>
            {this.state.showSubItems === true ?
                <SecondaryAwardType subList={this.props.subList} /> : null }
        </div>);

        return (
            <div>
                {primaryAwardList}
            </div>
        );
    }
}
PrimaryAwardType.propTypes = propTypes;
