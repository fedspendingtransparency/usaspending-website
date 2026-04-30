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

const DefinitionTabs = ({
    hasPlain = true, activeTab, hasOfficial = true, clickedTab
}) => {
    const items = [];

    if (hasPlain) {
        items.push(<TabItem
            key="plain"
            label="Plain Language"
            type="plain"
            active={activeTab === "plain"}
            clickedTab={clickedTab} />);
    }

    if (hasOfficial) {
        items.push(<TabItem
            key="official"
            label="Official Definition"
            type="official"
            active={activeTab === "official"}
            clickedTab={clickedTab} />);
    }

    return (
        <ul className="definition-tabs">
            {items}
        </ul>
    );
};

DefinitionTabs.propTypes = propTypes;
export default DefinitionTabs;
