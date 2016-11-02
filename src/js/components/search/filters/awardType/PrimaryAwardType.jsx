/**
 * primaryAwardType.jsx
 * Created by Emily Gullo 11/02/2016
 **/

import React from 'react';
import SecondaryAwardType from './SecondaryAwardType';
import CollapsedAwardType from './CollapsedAwardType';

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
        this.setState({
            showSubItems: !this.state.showSubItems
        });
    }

    render() {
        let primaryAward = (<CollapsedAwardType
            name={this.props.name}
            click={this.toggleSubItems.bind(this)} />);

        const secondaryAwardTypes = this.props.subList.map((subList, index) =>
            <SecondaryAwardType subListValue={this.props.subList[index]} key={index} />);

        if (this.state.showSubItems) {
            primaryAward = (
                <div className="primaryAward">
                    <CollapsedAwardType
                        name={this.props.name}
                        click={this.toggleSubItems.bind(this)} />
                    {secondaryAwardTypes}
                </div>);
        }

        return (
            <div>{ primaryAward }</div>
        );
    }
}
PrimaryAwardType.propTypes = propTypes;
