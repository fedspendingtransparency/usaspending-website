/**
 * primaryAwardType.jsx
 * Created by Emily Gullo 11/02/2016
 **/

import React from 'react';

import awardTypeCodes from 'dataMapping/search/awardType';

import SecondaryAwardType from './SecondaryAwardType';
import CollapsedAwardType from './CollapsedAwardType';

const propTypes = {
    name: React.PropTypes.string,
    filters: React.PropTypes.array,
    value: React.PropTypes.string
};

const defaultProps = {
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
            name={this.props.name}
            click={this.toggleSubItems.bind(this)} />);

        if (this.state.showSubItems) {
            const secondaryAwardTypes = this.props.filters.map((code, index) =>
                <SecondaryAwardType
                    {...this.props}
                    code={code}
                    name={awardTypeCodes[code]}
                    key={this.props.id + '-' + code}
                    id={this.props.id + '-' + code} />);

            primaryAward = (
                <div className="awardSet">
                    <div className="primaryAward">
                        <CollapsedAwardType
                            id={this.props.id}
                            name={this.props.name}
                            code={this.props.value}
                            click={this.toggleSubItems.bind(this)} />
                    </div>
                    <div className="secondaryAwardSet">
                        {secondaryAwardTypes}
                    </div>
                </div>);
        }

        return (
            <div>{ primaryAward }</div>
        );
    }
}

PrimaryAwardType.propTypes = propTypes;
PrimaryAwardType.defaultProps = defaultProps;
