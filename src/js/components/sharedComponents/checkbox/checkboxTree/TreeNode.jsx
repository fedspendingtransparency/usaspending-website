/**
 * TreeNode.jsx
 * Created by Andrea Blackwell 02/2025
 */

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    label: PropTypes.string,
    countLabel: PropTypes.string,
    disabled: PropTypes.bool,
    onChecked: PropTypes.func,
    onExpand: PropTypes.func,
    onCollapse: PropTypes.func,
    node: PropTypes.arrayOf(PropTypes.object)
};

const TreeNode = (props) => {
    const {
        label, disabled, onChecked, onExpand, node, isLoading, onCollapse, countLabel
    } = props;

    const [isExpanded, setIsExpanded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [childNodes, setChildNodes] = useState([]);
    const [selectedNode, setSelectedNode] = useState();

    const childNode = useRef();

    useEffect(() => {
        if (!isLoading) {
            setLoading(false);
        }
    }, [isLoading]);

    useEffect(() => {
        if (node && isExpanded && loading) {
            setSelectedNode(node);
            const nodeValue = node?.ancestors?.length > 0 ? `${node.ancestors[0]}/${node.id}` : node.id;
            const newChildValue = [...childNodes, nodeValue];
            setChildNodes(newChildValue);
            onExpand(newChildValue, node);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isExpanded, loading]);

    const handleToggle = async () => {
        if (!isExpanded && node.children?.length > 0) {
            // check if child already exists and do something different
            setLoading(true);
            setIsExpanded(true);

            if (childNodes.length > 0 && childNodes?.findIndex((element) => element.includes(node.id)) > -1) {
                childNode.current.style.display = 'block';
                setLoading(false);
            } else {
                setLoading(true);
                setIsExpanded(true);
                if (onExpand) {
                    onExpand(childNodes, selectedNode);
                }
            }
        }
        else {
            setIsExpanded(false);
            childNode.current.style.display = 'none';
            onCollapse(childNodes);
        }
    };

    const handleCheck = () => {
        onChecked();
    };

    return (
        <div style={{ marginLeft: '20px' }}>
            <div>
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                {node.children?.length > 0 ?
                    <div className="checkbox-treenode__wrapper" style={{ display: "flex", flexDirection: "row", alignItems: "start" }}>
                        <div className="checkbox-treenode__header-icon">
                            {!isExpanded &&
                                <FontAwesomeIcon
                                    onClick={() => handleToggle()}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") handleToggle();
                                    }}
                                    tabIndex={0}
                                    icon="chevron-right" />}
                            {isExpanded &&
                                <FontAwesomeIcon
                                    onClick={() => handleToggle()}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") handleToggle();
                                    }}
                                    tabIndex={0}
                                    icon="chevron-down" />}
                        </div>
                        <input
                            type="checkbox"
                            disabled={disabled}
                            onChange={handleCheck} />
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                        <div>
                            <span>{node?.id} {node?.count && node.count > 0 ? `${node?.count} ${countLabel}` : ''}</span><br />
                            <div>{label}</div>
                            <span>{loading && <span>Loading...</span>}</span>
                        </div>
                    </div>
                    :
                    <>
                        <input
                            type="checkbox"
                            disabled={disabled}
                            onChange={handleCheck} />
                        {/* // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions*/}
                        <span style={{ cursor: 'pointer', marginLeft: '5px' }}>
                            {node.id} {node?.count && node.count > 0 ? `${node?.count} ${countLabel}` : ''}
                        </span><br />
                        <div>{label}</div>
                        <span>{loading && <span>Loading...</span>}</span>
                    </>
                }
            </div>
            <div ref={childNode}>
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
                        node={child}
                        countLabel={props.countLabel} />))
                    : ''}
            </div>
        </div>
    );
};

TreeNode.propTypes = propTypes;
export default TreeNode;
