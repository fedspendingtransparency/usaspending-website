/**
 * CheckboxTree.jsx
 * Created by Andrea Blackwell 02/2025
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TreeNode from "./TreeNode";

const CheckboxTree = ({
    nodes, disabled, onChecked, onExpand
}) => {
    // eslint-disable-next-line no-shadow
    const renderTreeNodes = (nodes) => nodes.map((label) => (
        <TreeNode
            key={label}
            label={label}
            disabled={disabled}
            onExpand={onExpand}
            onChecked={onChecked} />
    ));

    return (
        <div>{renderTreeNodes(nodes)}</div>
    );
};

export default CheckboxTree;
