/**
 * TreeNodesWrapper.jsx
 * Created by Andrea Blackwell June 2025
 **/

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TreeNodes from './TreeNodes';

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

const TreeNodesWrapper = ({
    nodes,
    disabled = false,
    checked = [],
    expanded = [],
    onCheck,
    onExpand,
    isLoading
}) => {
    const [localChecked, setLocalChecked] = useState(checked);
    const [localExpanded, setLocalExpanded] = useState(expanded);
    const [localNodes, setLocalNodes] = useState(nodes);
    const [loadingParentId, setLoadingParentId] = useState();

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
        const modifiedNode = findNodeById(id);
        let newChecked;

        if (isChecked) {
            // Uncheck node and its descendants
            newChecked = localChecked.filter((cid) => cid !== id && !descendantIds.includes(cid));
            setLocalChecked(newChecked);
            if (onCheck) onCheck(newChecked, modifiedNode);
        }
        else {
            if ((descendantIds.length > 0)) {
                // Check node's descendants
                newChecked = [...new Set([...localChecked, ...descendantIds])];
            }
            else {
                // Check node
                newChecked = [...new Set([...localChecked, id])];
            }

            setLocalChecked([...new Set([...localChecked, id, ...descendantIds])]);
            if (onCheck) onCheck(newChecked, modifiedNode);
        }
    };

    const handleToggle = (id, hasChildren) => {
        const isExpanded = localExpanded.includes(id);
        if (!isExpanded && hasChildren) {
            const node = findNodeById(id);
            const nodeValue = node?.ancestors?.length > 0 ? `${node.ancestors[0]}/${id}` : id;
            // TODO: this is confusing, the onexpand function need to be sent the id but the local expand needs to take the nodeValue
            onExpand([...localExpanded, id], node);
            setLocalExpanded((prev) => [...prev, nodeValue]);
            // if the parent is checked, update local checked
            setLoadingParentId(id);
        }
        else {
            setLocalExpanded((prev) => prev.filter((eid) => eid !== id));
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
                isLoading={isLoading}
                loadingParentId={loadingParentId} />
        </div>);
};

TreeNodesWrapper.propTypes = propTypes;
export default TreeNodesWrapper;
