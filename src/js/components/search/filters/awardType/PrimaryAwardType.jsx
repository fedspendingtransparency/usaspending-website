/**
 * primaryAwardType.jsx
 * Created by Emily Gullo 11/02/2016
 **/

import React from 'react';

import awardTypeCodes from 'dataMapping/search/awardType';

import SecondaryAwardType from './SecondaryAwardType';
import CollapsedAwardType from './CollapsedAwardType';
import SingleAwardType from './SingleAwardType';

const propTypes = {
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    filters: React.PropTypes.array,
    value: React.PropTypes.string
};

const defaultProps = {
    id: '',
    name: '',
    filters: [],
    value: null
};

export default class PrimaryAwardType extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showSubItems: false
        };
    }

    toggleSubItems(e) {
        e.preventDefault();

        this.setState({
            showSubItems: !this.state.showSubItems
        });
    }

    render() {
        let primaryAward = (<CollapsedAwardType
            id={this.props.id}
            name={this.props.name}
            code={this.props.value}
            click={this.toggleSubItems.bind(this)} />);

        let secondaryAwardTypes = null;

        if (this.state.showSubItems) {
            secondaryAwardTypes = this.props.filters.map((code) =>
                <SecondaryAwardType
                    {...this.props}
                    code={code}
                    name={awardTypeCodes[code]}
                    key={`${this.props.id} - ${code}`}
                    id={`${this.props.id} - ${code}`} />);
        }

        if (this.props.filters.length === 0) {
            primaryAward = (<SingleAwardType
                {...this.props}
                code={this.props.value}
                name={this.props.name}
                key={`${this.props.id} - ${this.props.value}`}
                id={`${this.props.id} - ${this.props.value}`} />);
        }

        return (
            <div className="awardSet">
                <div className="primaryAward">
                    {primaryAward}
                </div>
                <div className="secondaryAwardSet">
                    {secondaryAwardTypes}
                </div>
            </div>
        );
    }
}

PrimaryAwardType.propTypes = propTypes;
PrimaryAwardType.defaultProps = defaultProps;
