import React, { useState, useRef } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { uniqueId } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CheckboxTree from 'components/sharedComponents/CheckboxTree';
import { updateDefCodes } from 'redux/actions/search/searchFilterActions';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';

export const NewBadge = () => (
    <div className="advanced-search-filter-accessory__new-badge">NEW</div>
);

const mockData = {
    label: "COVID-19 Response",
    value: "COVID",
    expandDisabled: true,
    showNodeIcon: false,
    children: [
        {
            label: "Some Description with placeholder content...",
            value: "L",
            expandDisabled: true
        },
        {
            label: "Some Description with placeholder content...",
            value: "M",
            expandDisabled: true
        },
        {
            label: "Some Description with placeholder content...",
            value: "N",
            expandDisabled: true
        },
        {
            value: "O",
            label: "Some Description with placeholder content..."
        },
        {
            value: "P",
            label: "Some Description with placeholder content...",
            expandDisabled: true
        }
    ]
};

const defaultExpanded = ['COVID'];
const nodes = [mockData];
const countLabel = { value: 'COVID-19', count: 0, label: 'COVID-19 Response' };

const DEFCheckboxTree = ({
    counts,
    stageDef
}) => {
    const hint = useRef();
    const [checked, setChecked] = useState([]);

    const stageFilter = (newChecked) => {
        setChecked(newChecked);
        const newCount = newChecked.reduce((acc) => acc + 1, 0);
        if (newCount > 0) {
            stageDef(
                newChecked,
                [],
                [{ ...countLabel, count: newCount }]
            );
        }
        else {
            stageDef(
                [],
                [],
                []
            );
        }
    };
    
    const removeSelectedFilter = (e) => {
        e.preventDefault();
        stageDef([]);
        setChecked([]);
    };

    return (
        <div className="def-code-filter">
            <CheckboxTree
                className="def-checkbox-tree"
                checked={checked}
                expanded={defaultExpanded}
                data={nodes}
                isError={false}
                errorMessage={null}
                isLoading={false}
                searchText=""
                noResults={false}
                onUncheck={stageFilter}
                onCheck={stageFilter} />
            {counts.length > 0 && (
                <div
                    className="selected-filters"
                    role="status">
                    {counts.map((node) => {
                        const label = `${node.value} - ${node.label} (${node.count})`;
                        return (
                            <button
                                key={uniqueId()}
                                className="shown-filter-button"
                                value={label}
                                onClick={(e) => removeSelectedFilter(e, node)}
                                title="Click to remove."
                                aria-label={`Applied filter: ${label}`}>
                                {label}
                                <span className="close">
                                    <FontAwesomeIcon icon="times" />
                                </span>
                            </button>
                        );
                    })}
                </div>
            )}
            <SubmitHint ref={hint} />
        </div>
    );
};

DEFCheckboxTree.propTypes = {
    counts: PropTypes.arrayOf(PropTypes.shape({})),
    stageDef: PropTypes.func
};

const mapStateToProps = (state) => ({
    counts: state.filters.defCodes.toObject().counts
});

const mapDispatchToProps = (dispatch) => ({
    stageDef: (require, exclude, counts) => dispatch(updateDefCodes(require, exclude, counts))
});

export default connect(mapStateToProps, mapDispatchToProps)(DEFCheckboxTree);
