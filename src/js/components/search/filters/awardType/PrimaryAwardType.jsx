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

        if (this.state.showSubItems) {
            const secondaryAwardTypes = this.props.subList.map((subList, index) =>
                <SecondaryAwardType subListValue={this.props.subList[index]} key={index} />);

            primaryAward = (
                <div className="awardSet">
                    <div className="primaryAward">
                        <CollapsedAwardType
                            name={this.props.name}
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
