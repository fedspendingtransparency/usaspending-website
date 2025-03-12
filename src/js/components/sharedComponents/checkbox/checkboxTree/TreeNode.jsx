/**
 * TreeNode.jsx
 * Created by Andrea Blackwell 02/2025
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const TreeNode = (props) => {
    const {
        label, children, disabled, onChecked, onExpand, nodes, node
    } = props;

    const [isExpanded, setIsExpanded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [childNodes, setChildNodes] = useState([]);
    const [selectedNode, setSelectedNode] = useState();

    useEffect(() => {
        if (childNodes.indexOf(node?.value) > 0) {
            console.log(node);
        }
    }, [childNodes, node]);

    useEffect(() => {
        if (childNodes.length > 0) {
            console.log("childNodes", childNodes, node);
        }
    }, [childNodes, node]);

    useEffect(() => {
        if (node && isExpanded && loading) {
            setSelectedNode(node);
            const nodeValue = node?.ancestors?.length > 0 ? `${node.ancestors[0]}/${node.id}` : node.id;
            console.log("tree node check", childNodes, node, nodeValue);
            const newChildValue = [...childNodes, nodeValue];
            setChildNodes(newChildValue);
            onExpand(newChildValue, node);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isExpanded, loading]);

    const handleToggle = async () => {
        if (!isExpanded || node.children?.length > 0) {
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
                {node.children?.length > 0 ?
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                        <div className="checkbox-filter__wrapper">
                            <div
                                className="checkbox-filter__header accordion-checkbox"
                                role="button"
                                tabIndex="0">
                                <div className="checkbox-filter__header-icon">
                                    {!expandedCategories?.includes(category.id) &&
                                        <FontAwesomeIcon
                                            onClick={() => toggleExpanded(category)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") toggleExpanded(category);
                                            }}
                                            tabIndex={0}
                                            icon="chevron-right" />}
                                    {expandedCategories?.includes(category.id) &&
                                        <FontAwesomeIcon
                                            onClick={() => toggleExpanded(category)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") toggleExpanded(category);
                                            }}
                                            tabIndex={0}
                                            icon="chevron-down" />}
                                </div>
                                <input
                                    type="checkbox"
                                    onChange={toggleChildren}
                                    checked={allChildren}
                                    id={`primary-checkbox__${category.id}`} />
                                <div className="checkbox-filter__header-label-container">
                                    <span className="checkbox-filter__header-label accordion-checkbox">{category.name}</span>
                                    <span className="checkbox-filter__header-count">
                                        {count}{' '}
                                        {count === 1 ? 'type' : 'types'}
                                    </span>
                                </div>
                            </div>
                            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                            <span>{label}</span>
                            <span>{loading && <span>Loading...</span>}</span>
                        </div>
                    :
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                    <span style={{ cursor: 'pointer', marginLeft: '5px' }}>
                        {label}
                    </span>
                }
            </div>
            <div>
                {childNodes?.length > 0 ? node.children?.map((child) => (
                    <TreeNode
                        key={child.description}
                        label={child.description}
                        onExpand={onExpand}
                        onChecked={onChecked}
                        disabled={disabled}
                        checked={props.checked}
                        expanded={props.expanded}
                        icons={props.icons}
                        node={child} />))
                    : ''}
            </div>
        </div>
    );
};

export default TreeNode;
