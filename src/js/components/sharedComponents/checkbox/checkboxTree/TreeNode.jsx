/**
 * TreeNode.jsx
 * Created by Andrea Blackwell 02/2025
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TreeNode = (props) => {
    const { label, children, disabled, onChecked, onExpand, nodes } = props;

    const [isExpanded, setIsExpanded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [childNodes, setChildNodes] = useState([]);

    const handleToggle = async () => {
        const selectedNode = nodes.find((node) => node.description === label);

        if (!isExpanded) {
            setLoading(true);
            setIsExpanded(true);
            if (onExpand) {
                onExpand([selectedNode.value], selectedNode);
            }
        }
    };

    const handleCheck = () => {
        onChecked();
    };

    return (
        <div style={{ maginLeft: '20px' }}>
            <div>
                <input
                    type="checkbox"
                    disabled={disabled}
                    onChange={handleCheck} />
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                <span onClick={handleToggle} style={{ cursor: 'pointer', marginLeft: '5px' }}>
                    {label} {loading && <span>Loading...</span>}
                </span>
            </div>
            {isExpanded && (
                <div>
                    {childNodes.length > 0 ? childNodes.map((childLabel) => (
                        <TreeNode
                            key={childLabel}
                            label={childLabel}
                            disabled={disabled}
                            onExpand={onExpand}
                            onChecked={onChecked} />))
                        : !loading && <div>No child nodes found.</div>}
                </div>
            )}
        </div>
    );
};

export default TreeNode;
