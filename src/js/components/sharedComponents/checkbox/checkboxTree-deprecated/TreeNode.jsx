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
    onCheck: PropTypes.func,
    onExpand: PropTypes.func,
    onCollapse: PropTypes.func,
    node: PropTypes.arrayOf(PropTypes.object)
};

const TreeNode = (props) => {
    const {
        label, disabled, onChecked, checked, onExpand, node, isLoading, onCollapse, countLabel
    } = props;

    console.log(node);

    const [isExpanded, setIsExpanded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [childNodes, setChildNodes] = useState([]);
    const [childNodeValues, setChildNodeValues] = useState([]);
    const [isChecked, setIsChecked] = useState(false);

    const childNode = useRef();
    const childNodeRef = useRef();

    const handleToggle = async () => {
        if (!isExpanded && node.children?.length > 0) {
            // check if child already exists and do something different
            setLoading(true);
            setIsExpanded(true);

            if (childNodes.length > 0 && childNodes?.findIndex((element) => element.includes(node.id)) > -1) {
                childNode.current.style.display = 'block';
                setLoading(false);
            }
            else {
                setLoading(true);
                setIsExpanded(true);
                if (onExpand) {
                    onExpand(childNodes, node);
                }
            }
        }
        else {
            setIsExpanded(false);
            childNode.current.style.display = 'none';
            onCollapse(childNodes);
        }
    };

    const findChildren = (items) => {
        const result = [];

        if (!items || items.length === 0) {
            result.push(node.value);
        }

        items.forEach((item) => {
            if (item.children && item.children.length > 1) {
                findChildren(item.children);
            }
            else if (item.children?.length === 1) {
                result.push(item?.children[0].value);
            }
            else {
                result.push(item?.value);
            }
        });

        return result;
    };

    // const isChecked = (checked) => {
    //     const childIds = checked?.findIndex((element) => element?.includes(node?.children[0]?.value)) > -1;
    //     console.log(childIds, checked, node);
    //     return childIds;
    // };

    const handleCheck = () => {
        // TODO:  Add check if the checkbox is a parent or a child
        const children = findChildren(node.children);
        onChecked(children, node);

        // not sure if this is needed
        // isChecked(checked);
        // this is needed
        // setChildNodeValues(tempChecked);
    };


    useEffect(() => {
        if (!isLoading) {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    useEffect(() => {
        if (node && isExpanded && loading) {
            // setSelectedNode(node);
            const nodeValue = node?.ancestors?.length > 0 ? `${node.ancestors[0]}/${node.id}` : node.id;
            const newChildValue = [...childNodes, nodeValue];
            setChildNodes(newChildValue);
            onExpand(newChildValue, node);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isExpanded, loading]);

    // useEffect(() => {
    //     const checked = flattenChildren(node.children);
    //     setChildNodeValues(checked);
    //     setIsChecked(checked?.findIndex((element) => element?.includes(node?.children[0]?.value)) > -1);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [isChecked]);

    useEffect(() => {
        // const checked = flattenChildren(node.children);
        // console.log(checked, node);
        // setChildNodeValues(checked);
        const nodeValue = node.children && node.children.length > 0 ? node?.children[0]?.value : node?.value;
        // add a check for value (instead of children_of, maybe)
        // console.log("checked in tree node", checked, checked?.findIndex((element) => element?.includes(nodeValue)) > -1);
        setIsChecked(checked?.findIndex((element) => element?.includes(nodeValue)) > -1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked, node]);

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
                            onChange={handleCheck}
                            checked={isChecked} />
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                        <div>
                            <span>{node?.id} {node?.count && node.count > 0 ? `${node?.count} codes` : ''}</span><br />
                            <div>{label}</div>
                            {isLoading &&
                                <div className="checkbox-tree-filter-message-container">
                                    <FontAwesomeIcon icon="spinner" spin />
                                    <div className="checkbox-tree-filter-message-container__text">Loading your data...</div>
                                </div>
                            }
                        </div>
                    </div>
                    :
                    <>
                        <input
                            type="checkbox"
                            disabled={disabled}
                            onChange={handleCheck}
                            checked={isChecked} />
                        {/* // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions*/}
                        <span style={{ cursor: 'pointer', marginLeft: '5px' }}>
                            {node.id} {node?.count && node.count > 0 ? `${node?.count} ${countLabel}` : ''}
                        </span><br />
                        <div>{label}</div>
                        {isLoading &&
                            <div className="checkbox-tree-filter-message-container">
                                <FontAwesomeIcon icon="spinner" spin />
                                <div className="checkbox-tree-filter-message-container__text">Loading your data...</div>
                            </div>
                        }
                    </>
                }
            </div>
            <div ref={childNode}>
                {childNodes?.length > 0 ? node.children?.map((child) => (
                    <TreeNode
                        ref={childNodeRef}
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
