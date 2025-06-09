import React, { useState, useEffect, useRef } from 'react';
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
    isLoadingNodeIds: PropTypes.arrayOf(PropTypes.string)
};

const TreeNodes = ({
    nodes,
    disabled = false,
    checked = [],
    expanded = [],
    onCheck,
    onExpand,
    onCollapse,
    isLoadingNodeIds = []
}) => {
    const [localChecked, setLocalChecked] = useState(checked);
    const [localExpanded, setLocalExpanded] = useState(expanded);
    const [loadingNodes, setLoadingNodes] = useState([]);

    useEffect(() => {
        setLocalChecked(checked);
    }, [checked]);

    useEffect(() => {
        setLocalExpanded(expanded);
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
            const hasStoredChildren = node && node.children && node.children.length > 0;

            setLocalExpanded((prev) => [...prev, id]);

            if (hasStoredChildren) {
                setLoadingNodes((prev) => prev.filter((nid) => nid !== id));
                console.log("on onExpand");
                onExpand([id], node);
            }
        }
        else {
            setLocalExpanded((prev) => prev.filter((eid) => eid !== id));
            if (onCollapse) {
                console.log("on collapse");
                onCollapse(id);
            }
        }
    };

    const renderTree = () => {
        const flatNodes = [];
        const stack = nodes.map((n) => ({ node: n, level: 0 }));

        while (stack.length > 0) {
            const { node, level } = stack.shift();
            flatNodes.push({ node, level });

            if (localExpanded.includes(node.id) && node.children?.length > 0) {
                node.children.forEach((child) => {
                    stack.push({ node: child, level: level + 1 });
                });
            }
        }

        return flatNodes.map(({ node, level }) => {
            const isChecked = localChecked.includes(node.id);
            const isExpanded = localExpanded.includes(node.id);
            // const isLoading = loadingNodes.includes(node.id) || isLoadingNodeIds.includes(node.id);
            const isLoading = loadingNodes.includes(node.id);

            // eslint-disable-next-line react/react-in-jsx-scope
            return (<div key={node.id} style={{ marginLeft: level * 20, display: 'flex', alignItems: 'center' }}>
                {node.children && (
                    // eslint-disable-next-line react/react-in-jsx-scope
                    <FontAwesomeIcon
                        icon={isExpanded ? 'chevron-down' : 'chevron-right'}
                        onClick={() => handleToggle(node.id, !!node.children)}
                        style={{ cursor: 'pointer', marginRight: '5px' }} />
                )}
                {/* eslint-disable-next-line react/react-in-jsx-scope */}
                <input
                    type="checkbox"
                    disabled={disabled}
                    checked={isChecked}
                    onChange={() => handleCheck(node.id, node.children || [])}
                    style={{ marginRight: '5px' }} />
                {/* eslint-disable-next-line react/react-in-jsx-scope */}
                <span>{node.label || node.id}</span>
                {/*{isLoading && (*/}
                {/*    // eslint-disable-next-line react/react-in-jsx-scope*/}
                {/*    <span style={{ marginLeft: '10px' }}>*/}
                {/*        /!* eslint-disable-next-line react/react-in-jsx-scope *!/*/}
                {/*        <FontAwesomeIcon icon="spinner" spin /> Loading...*/}
                {/*    </span>*/}
                {/*)}*/}
            </div>);
        });
    };

    // eslint-disable-next-line react/react-in-jsx-scope
    return (<div>{renderTree()}</div>);
};

TreeNodes.propTypes = propTypes;
export default TreeNodes;
