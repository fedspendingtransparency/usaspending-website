/* eslint-disable max-len */
/**
 * TreeNodesWrapper.jsx
 * Created by Andrea Blackwell June 2025
 **/

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import TreeNodes from './TreeNodes';
import { removePlaceholderString } from '../../../helpers/checkboxTreeHelper';

const propTypes = {
    nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
    disabled: PropTypes.bool,
    checked: PropTypes.arrayOf(PropTypes.string),
    expanded: PropTypes.arrayOf(PropTypes.string),
    onCheck: PropTypes.func,
    onExpand: PropTypes.func
};

const TreeNodesWrapper = ({
    nodes,
    disabled = false,
    checked = [],
    expanded = [],
    onCheck,
    onExpand
}) => {
    const [localChecked, setLocalChecked] = useState(checked);
    const [localExpanded, setLocalExpanded] = useState(expanded);
    const [localNodes, setLocalNodes] = useState(nodes);
    const checkboxRefs = useRef({});

    useEffect(() => {
        setLocalNodes(nodes);
    }, [nodes]);

    useEffect(() => {
        setLocalExpanded(expanded);
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [expanded]);

    useEffect(() => {
        setLocalChecked(checked);
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [checked]);

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

    const handleIndeterminateChildren = (node) => {
        if (node.children) {
            for (let i = 0; i < node.children.length; i++) {
                const child = node.children[i];
                if (checkboxRefs.current) {
                    if (checkboxRefs.current[child.id]) checkboxRefs.current[child.id].indeterminate = false;
                }
                if (child.children?.length) handleIndeterminateChildren(child);
            }
        }
    };

    const handleIndeterminateAncestors = (node, newChecked) => {
        if (node.ancestors) {
            const ancestorNodes = node.ancestors.map((ancestor) => findNodeById(ancestor));
            if (ancestorNodes.length) {
                ancestorNodes.forEach((parent) => {
                    // check if anything is checked
                    if (newChecked?.length) {
                        let allChecked = [...newChecked];
                        let nodePriorChecked = false;

                        if (localChecked?.length) {
                            allChecked = [...localChecked, ...newChecked];
                            nodePriorChecked = localChecked.includes(node.id);
                        }

                        const hasAnyChildrenChecked = parent.children.filter((child) => allChecked.includes(child.id) || node.id === child.id);
                        let setIndeterminate = (hasAnyChildrenChecked.length > 0) && (hasAnyChildrenChecked.length < parent.children.length);

                        if (checkboxRefs.current) {
                            if (nodePriorChecked) {
                                // unchecking prior checked node.
                                const anyChildrenNewChecked = parent.children.filter((child) => newChecked.includes(child.id));
                                if (localChecked?.includes(parent.id) && anyChildrenNewChecked?.length > 0) {
                                    // unchecking a single node make any checked ancestors indeterminate
                                    setIndeterminate = checkboxRefs.current[parent.id].checked;
                                }
                            }
                            if (setIndeterminate) {
                                // make sure all ancesters get properly set
                                handleIndeterminateAncestors(parent, newChecked);
                            }
                            checkboxRefs.current[parent.id].indeterminate = setIndeterminate;
                        }
                    }
                    else if (checkboxRefs.current) checkboxRefs.current[parent.id].indeterminate = false;
                });
            }
        }
    };

    const handleIndeterminate = (node, newChecked = []) => {
        // clean up any hanging children indeterminates first.
        handleIndeterminateChildren(node);
        handleIndeterminateAncestors(node, newChecked);
    };

    const handleAutoCheckAncestors = (node, newChecked) => {
        let updatedChecked = newChecked;
        if (node.ancestors) {
            const ancestorNodes = node.ancestors.map((ancestor) => findNodeById(ancestor));
            if (ancestorNodes.length) {
                ancestorNodes.forEach((parent) => {
                    const children = parent.children;
                    const allChecked = children.every(
                        (child) => (newChecked.includes(
                            removePlaceholderString(child.id)) || (node.id === removePlaceholderString(child.id))
                        ));

                    if (allChecked) {
                        updatedChecked = [...new Set([...updatedChecked, parent.id])];
                    }
                    else {
                        // ancestor should not be checked if not allChecked
                        updatedChecked = updatedChecked.filter((c) => c !== parent.id);
                    }
                });
            }
        }
        return updatedChecked;
    };

    const handleCheck = (id, children = []) => {
        const isChecked = localChecked.includes(id);
        const descendantIds = getDescendantIds(children);
        const modifiedNode = findNodeById(id);
        let newChecked;

        if (isChecked) {
            // Uncheck node and its descendants
            const excludeSet = [...descendantIds, id];
            newChecked = localChecked.filter((cid) => !excludeSet.includes(cid));

            newChecked = handleAutoCheckAncestors(modifiedNode, newChecked);
            handleIndeterminate(modifiedNode, newChecked);
            setLocalChecked([...new Set([...newChecked])]);
            if (onCheck) onCheck(newChecked, modifiedNode);
        }
        else {
            if ((descendantIds.length > 0)) {
                // Check node's descendants
                newChecked = [...new Set([...localChecked, id, ...descendantIds])];
            }
            else {
                // Check node
                newChecked = [...new Set([...localChecked, id])];
            }

            newChecked = handleAutoCheckAncestors(modifiedNode, newChecked);
            handleIndeterminate(modifiedNode, newChecked);
            setLocalChecked([...new Set([...newChecked])]);
            if (onCheck) onCheck(newChecked, modifiedNode);
        }
    };

    const handleToggle = (id, hasChildren) => {
        const isExpanded = localExpanded.includes(id);
        const node = findNodeById(id);
        if (!isExpanded && hasChildren) {
            onExpand([...localExpanded, id], node);
        }
        else {
            const newExpand = localExpanded.filter((eid) => eid !== id);
            onExpand(newExpand, node);
        }
    };

    return (
        <div>
            <TreeNodes
                localNodes={localNodes}
                localChecked={localChecked}
                localExpanded={localExpanded}
                toggleExpand={handleToggle}
                disabled={disabled}
                handleCheck={handleCheck}
                checkboxRefs={checkboxRefs} />
        </div>);
};

TreeNodesWrapper.propTypes = propTypes;
export default TreeNodesWrapper;
