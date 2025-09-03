/**
 * TreeNodes.jsx
 * Created by Andrea Blackwell August 2025
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    localNodes: PropTypes.arrayOf(PropTypes.object).isRequired,
    localExpanded: PropTypes.array,
    localChecked: PropTypes.array,
    toggleExpand: PropTypes.func,
    disabled: PropTypes.bool,
    handleCheck: PropTypes.func,
    isLoading: PropTypes.bool,
    loadingParentId: PropTypes.number
};

const TreeNodes = ({
    localNodes, localExpanded, localChecked, toggleExpand, disabled, handleCheck, isLoading, loadingParentId
}) => {
    const isLoadingId = (id) => isLoading && loadingParentId === id;
    const renderNodes = (nodes, depth) => (
        <ul className="level">
            {nodes?.map((node) => {
                const isOpen = localExpanded.includes(node.id);
                const isChecked = localChecked.includes(node.id) || localChecked.includes(`children_of_${node.id}`);
                const hasAnyChildren = node.children && node.children.length > 0;
                return (
                    <li key={node.id}>
                        <div className="label">
                            {hasAnyChildren &&
                                <button
                                    type="button"
                                    onClick={() => toggleExpand(node.id, true)}
                                    title={isOpen ? "Collapse" : "Expand"}
                                    aria-label={isOpen ? "Collapse" : "Expand"}>
                                    <FontAwesomeIcon
                                        icon={isOpen ? 'chevron-down' : 'chevron-right'}
                                        style={{ cursor: 'pointer' }} />
                                </button>}

                            {node.label && <input
                                type="checkbox"
                                disabled={disabled}
                                checked={isChecked}
                                onChange={() => handleCheck(node.id, node.children || [])} />}
                            {node.label}
                        </div>
                        <div className={`${isOpen ? 'open' : ''}`}>
                            {isLoadingId(node.id) ?
                                <span className="loading">
                                    <FontAwesomeIcon icon="spinner" spin /> Loading your data...
                                </span>
                                :
                                isOpen && renderNodes(node.children || [], depth)
                            }
                        </div>
                    </li>);
            })}
        </ul>);

    return renderNodes(localNodes, 0);
};

TreeNodes.propTypes = propTypes;
export default TreeNodes;

