/**
 * TreeNode.jsx
 * Created by Andrea Blackwell 02/2025
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TreeNode = (props) => {
    const {
        label, children, disabled, onChecked, onExpand, nodes
    } = props;

    const [isExpanded, setIsExpanded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [childNodes, setChildNodes] = useState([]);
    const [selectedNode, setSelectedNode] = useState();

    useEffect(() => {
        if (childNodes.length > 0) {
            console.log("childNodes", childNodes);
        }
    }, [childNodes]);

    useEffect(() => {
        const node = nodes?.find((n) => n.description === label);
        if (node && isExpanded && loading) {
            setSelectedNode(node);
            const newChildValue = [...childNodes, node];
            setChildNodes(newChildValue);
            onExpand(newChildValue, node);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isExpanded, loading]);

    const handleToggle = async () => {
        if (!isExpanded) {
            setLoading(true);
            setIsExpanded(true);
            if (onExpand) {
                onExpand(childNodes, selectedNode);
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
            <div>
                {childNodes?.length > 0 ? childNodes?.map((childLabel) => (
                    <TreeNode
                        key={childLabel.id}
                        label={childLabel.description}
                        onExpand={onExpand}
                        onChecked={onChecked}
                        disabled={disabled}
                        checked={props.checked}
                        expanded={props.expanded}
                        icons={props.icons} />))
                    : !loading && <div>No child nodes found.</div>}
            </div>
        </div>
    );
};

export default TreeNode;
