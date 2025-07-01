/**
 * TreeNodes.jsx
 * Created by Andrea Blackwell June 2025
 **/

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
    disabled: PropTypes.bool,
    checked: PropTypes.arrayOf(PropTypes.string),
    expanded: PropTypes.arrayOf(PropTypes.string),
    onCheck: PropTypes.func,
    onExpand: PropTypes.func,
    onCollapse: PropTypes.func,
    isLoading: PropTypes.bool
};

const TreeNodes = ({
    nodes,
    disabled = false,
    checked = [],
    expanded = [],
    onCheck,
    onExpand,
    onCollapse,
    isLoading
}) => {
    const [localChecked, setLocalChecked] = useState(checked);
    const [localExpanded, setLocalExpanded] = useState(expanded);
    const [localNodes, setLocalNodes] = useState(nodes);
    const [loadingParentId, setLoadingParentId] = useState();

    useEffect(() => {
        setLocalChecked(checked);
    }, [checked, nodes]);

    useEffect(() => {
        setLoadingParentId(null);
        setLocalNodes(nodes);
    }, [nodes]);

    useEffect(() => {
        setLocalExpanded(expanded);
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [expanded]);


    const findNodeById = (id) => {
        const stack = [...nodes];
        while (stack.length) {
            const current = stack.pop();
            if (current.id === id) return current;
            if (current.children) stack.push(...current.children);
        }
        return null;
    };

    const getDescendantIds = (children) => {
        const ids = [];
        const stack = [...children];
        while (stack.length) {
            const current = stack.pop();
            ids.push(current.value);
            if (current.children) stack.push(...current.children);
        }
        return ids;
    };
    const handleCheck = (id, children = []) => {
        const isChecked = localChecked.includes(id);
        const descendantIds = getDescendantIds(children);
        let newChecked;

        if (isChecked) {
            // Uncheck node and its descendants
            newChecked = localChecked.filter((cid) => cid !== id && !descendantIds.includes(cid));
        }
        else {
            // Check node and its descendants
            newChecked = [...new Set([...localChecked, id, ...descendantIds])];
        }

        setLocalChecked(newChecked);
        const modifiedNode = findNodeById(id);
        if (onCheck) onCheck(newChecked, modifiedNode);
    };

    const handleToggle = (id, hasChildren) => {
        const isExpanded = localExpanded.includes(id);

        if (!isExpanded && hasChildren) {
            const node = findNodeById(id);
            onExpand([id, ...localExpanded], node);
            setLocalExpanded((prev) => [...prev, id]);
            // if the parent is checked, update local checked
            setLoadingParentId(id);
        }
        else {
            setLocalExpanded((prev) => prev.filter((eid) => eid !== id));
            onCollapse(id);
        }
    };
    const renderNestedNodes = (renderNodes, level) => renderNodes.map((node) => {
        const isChecked = localChecked.some((item) => item.includes(node.id));
        const isExpanded = localExpanded.includes(node.id);
        const hasChildren = node.children && node.children.length > 0;
        return (
            <div key={node.id}>
                {isLoading && loadingParentId === node.id ? (
                    <div style={{ marginLeft: '10px' }}>
                        <br />
                        <FontAwesomeIcon icon="spinner" spin /> Loading your data...
                    </div>
                )
                    :
                    (
                        <div style={{ marginLeft: level * 20, display: 'flex', alignItems: 'center' }}>
                            {hasChildren && (
                                <FontAwesomeIcon
                                    icon={isExpanded ? 'chevron-down' : 'chevron-right'}
                                    onClick={() => handleToggle(node.id, true)}
                                    style={{ cursor: 'pointer', marginRight: '5px' }} />
                            )}
                            {node.label && <input
                                type="checkbox"
                                disabled={disabled}
                                checked={isChecked}
                                onChange={() => handleCheck(node.id, node.children || [])}
                                style={{ marginRight: '5px' }} />}
                            <span>{node.label}</span>
                        </div>
                    )
                }
                {level < 4 && isExpanded && hasChildren && renderNestedNodes(node.children, level + 1)}
            </div>
        );
    });
    return <div>{renderNestedNodes(localNodes, 0)}</div>;
};

TreeNodes.propTypes = propTypes;
export default TreeNodes;
