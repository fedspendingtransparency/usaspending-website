/**
 * DefinitionTabs.jsx
 * Created by Kevin Li 5/1/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import TabItem from './TabItem';

const propTypes = {
    activeTab: PropTypes.string,
    clickedTab: PropTypes.func,
    hasPlain: PropTypes.bool,
    hasOfficial: PropTypes.bool
};

const defaultProps = {
    hasPlain: true,
    hasOfficial: true
};

export default class DefinitionTabs extends React.Component {
    render() {
        const items = [];

        if (this.props.hasPlain) {
            items.push(<TabItem
                key="plain"
                label="Plain Language"
                type="plain"
                active={this.props.activeTab === "plain"}
                clickedTab={this.props.clickedTab} />);
        }

        if (this.props.hasOfficial) {
            items.push(<TabItem
                key="official"
                label="Official Definition"
                type="official"
                active={this.props.activeTab === "official"}
                clickedTab={this.props.clickedTab} />);
        }


        return (
            <ul className="definition-tabs">
                {items}
            </ul>
        );
    }
}

DefinitionTabs.propTypes = propTypes;
DefinitionTabs.defaultProps = defaultProps;
