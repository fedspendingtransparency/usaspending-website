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

const DefinitionTabs = (props) => {
    const items = [];

    if (props.hasPlain) {
        items.push(<TabItem
            key="plain"
            label="Plain Language"
            type="plain"
            active={props.activeTab === "plain"}
            clickedTab={props.clickedTab} />);
    }

    if (props.hasOfficial) {
        items.push(<TabItem
            key="official"
            label="Official Definition"
            type="official"
            active={props.activeTab === "official"}
            clickedTab={props.clickedTab} />);
    }

    return (
        <ul className="definition-tabs">
            {items}
        </ul>
    );
};

DefinitionTabs.propTypes = propTypes;
DefinitionTabs.defaultProps = defaultProps;
export default DefinitionTabs;
