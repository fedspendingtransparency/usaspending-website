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

    useEffect(() => {
        console.log("loaded");
    }, [nodes]);

    const handleToggle = async () => {
        const selectedNode = nodes.find((node) => node.description === label);

        setChildNodes((prevState) => prevState.push(selectedNode.value));

        const tempChildNodes = [...childNodes].push(selectedNode.id);

        if (!isExpanded) {
            setLoading(true);
            setIsExpanded(true);
            if (onExpand) {
                onExpand(tempChildNodes, selectedNode);
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
                    {props?.childNodes?.length > 0 ? props?.childNodes?.map((childLabel) => (
                        <TreeNode
                            key={childLabel}
                            label={childLabel}
                            onExpand={onExpand}
                            onChecked={onChecked}
                            disabled={disabled}
                            checked={props.checked}
                            expanded={props.expanded}
                            icons={props.icons} />))
                        : !loading && <div>No child nodes found.</div>}
                </div>
            )}
        </div>
    );
};

export default TreeNode;
