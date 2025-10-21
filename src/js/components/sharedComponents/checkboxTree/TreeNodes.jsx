/* eslint-disable max-len */
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
    loadingParentId: PropTypes.number,
    checkboxRefs: PropTypes.object
};

const TreeNodes = ({
    localNodes,
    localExpanded,
    localChecked,
    toggleExpand,
    disabled,
    handleCheck,
    isLoading,
    loadingParentId,
    checkboxRefs
}) => {
    const isLoadingId = (id) => isLoading && loadingParentId === id;
    const renderNodes = (nodes, depth) => (
        <ul className="level">
            {nodes?.map((node) => {
                const isOpen = localExpanded.includes(node.id);
                const isChecked = localChecked.includes(node.id) || localChecked.includes(`children_of_${node.id}`);
                const hasAnyChildren = node.children?.length > 0;

                if (node.value.includes("children_of_") && !isLoadingId(node.id)) return null;

                return (
                    <li key={node.id}>
                        <div className="checkbox-tree-label__container">
                            <div className="checkbox-tree-label__controls" >
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
                                    name={`checkbox-${node.id}`}
                                    disabled={disabled}
                                    checked={isChecked}
                                    ref={(el) => {
                                        if (el) {
                                            // eslint-disable-next-line no-param-reassign
                                            checkboxRefs.current[node.id] = el;
                                        }
                                        else {
                                            // eslint-disable-next-line no-param-reassign
                                            delete checkboxRefs.current[node.id];
                                        }
                                    }}
                                    onKeyDown={(e) => (e.key === "Enter" ? handleCheck(node.id, node.children || []) : "")}
                                    onChange={() => handleCheck(node.id, node.children || [])} />
                                }
                            </div>
                            {node.label}
                        </div>
                        <div className={`checkbox-tree-label__description ${isOpen ? 'open' : ''}`}>
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

