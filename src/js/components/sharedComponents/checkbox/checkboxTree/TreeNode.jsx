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
        label, disabled, onChecked, checked, onCheck, onExpand, node, isLoading, onCollapse, countLabel
    } = props;

    const [isExpanded, setIsExpanded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [childNodes, setChildNodes] = useState([]);
    const [childNodeValues, setChildNodeValues] = useState([]);
    const [isChecked, setIsChecked] = useState(false);

    const childNode = useRef();
    const childNodeRef = useRef();

    console.log(props.ref);

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

    const flattenChildren = (items) => {
        const result = [];

        if (!items || items.length === 0) {
            result.push(node.value);
        }

        items.forEach((item) => {
            if (item.children && item.children.length > 1) {
                flattenChildren(item.children);
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
        const tempChecked = flattenChildren(node.children);
        console.log(tempChecked);
        // isChecked(checked);
        // setChildNodeValues(tempChecked);
        onChecked(tempChecked, node);
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
        console.log("checked in tree node", checked);
        // const checked = flattenChildren(node.children);
        // console.log(checked, node);
        // setChildNodeValues(checked);
        // setIsChecked(checked?.findIndex((element) => element?.includes(node?.children[0]?.value)) > -1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
