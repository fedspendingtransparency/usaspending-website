/**
 * SecondaryAwardType.jsx
 * Created by Emily Gullo 11/02/2016
 **/

import React from 'react';
import _ from 'lodash';

const propTypes = {
    id: React.PropTypes.string,
    code: React.PropTypes.string,
    name: React.PropTypes.string,
    setAwardType: React.PropTypes.func,
    containerFilters: React.PropTypes.object
};

export default class SecondaryAwardType extends React.Component {
    toggleFilter() {
        const currentAwardTypes = _.concat([], this.props.containerFilters.awardType, this.props.code);
        this.props.setAwardType(currentAwardTypes);
    }
    render() {
        return (
            <div key={this.props.id} className="secondaryAwardTypeOption subList">
                <input
                    type="checkbox"
                    id={this.props.id}
                    value={this.props.code}
                    onChange={this.toggleFilter.bind(this)} />
                <label htmlFor={this.props.id}>{this.props.name}</label>
            </div>
        );
    }
}
SecondaryAwardType.propTypes = propTypes;
