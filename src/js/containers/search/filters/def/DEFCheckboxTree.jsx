import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { uniqueId, flowRight } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import withDefCodes from 'containers/covid19/WithDefCodes';

import CheckboxTree from 'components/sharedComponents/CheckboxTree';
import { updateDefCodes } from 'redux/actions/search/searchFilterActions';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import DEFCheckboxTreeLabel from 'components/search/filters/defc/DEFCheckboxTreeLabel';

export const NewBadge = () => (
    <div className="new-badge">NEW</div>
);

const covidParentNode = {
    label: "COVID-19 Spending",
    value: "COVID",
    className: "def-checkbox-label--covid",
    expandDisabled: true,
    isSearchable: false,
    showNodeIcon: false,
    children: []
};

const infrastructureParentNode = {
    label: "Infrastructure Spending",
    value: "INFRA",
    className: "def-checkbox-label--covid",
    expandDisabled: true,
    isSearchable: false,
    showNodeIcon: false,
    children: []
};

const parseCovidCodes = (codes) => codes
    .filter((code) => code.disaster === 'covid_19')
    .reduce((acc, covidCode) => ({
        ...acc,
        children: acc.children.concat([{
            label: covidCode.title,
            subLabel: covidCode.public_law,
            value: covidCode.code,
            expandDisabled: true
        }])
            .sort((a, b) => {
                if (a.value < b.value) return -1;
                if (a.value > b.value) return 1;
                return 0;
            })
    }), covidParentNode);

const extractInfraCodes = (codes) => codes
    .filter((code) => code.code === '1' || code.code === 'Z')
    .reduce((acc, infraCode) => ({
        ...acc,
        children: acc.children.concat([{
            label: infraCode.title,
            subLabel: infraCode.public_law,
            value: infraCode.code,
            expandDisabled: true
        }])
            .sort((a, b) => {
                if (a.value < b.value) return 1;
                if (a.value > b.value) return -1;
                return 0;
            })
    }), infrastructureParentNode);

const parseTreeCodes = (codes) => [parseCovidCodes(codes), extractInfraCodes(codes)];

const defaultExpanded = ['COVID', 'INFRA'];
const covidCountLabel = { value: 'COVID-19', count: 0, label: 'COVID-19 Spending' };
const infrastructureCountLabel = { value: 'Infrastructure', count: 0, label: 'Infrastructure Spending' };

export class DEFCheckboxTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            isLoading: false,
            isError: false,
            errorMessage: null
        };
        this.request = null;
    }

    stageFilter = (newChecked) => {
        const newCount = newChecked.reduce((acc) => acc + 1, 0);
        if (newCount > 0) {
            const infraCount = newChecked.filter((checked) => checked === 'Z' || checked === '1').length;
            const covidCount = newChecked.length - infraCount;
            const labels = [];
            if (covidCount) {
                labels.push({ ...covidCountLabel, count: covidCount });
            }
            if (infraCount) {
                labels.push({ ...infrastructureCountLabel, count: infraCount });
            }
            this.props.stageDef(
                newChecked,
                [],
                labels
            );
        }
        else {
            this.props.stageDef(
                [],
                [],
                []
            );
        }
    };

    removeSelectedFilter = (e) => {
        e.preventDefault();
        this.props.stageDef([], [], []);
    };

    render() {
        return (
            <div className="def-code-filter">
                <CheckboxTree
                    className="def-checkbox-tree"
                    checked={this.props.checked}
                    expanded={defaultExpanded}
                    data={parseTreeCodes(this.props.defCodes)}
                    isError={this.state.isError}
                    errorMessage={this.props.defCodeFetchError}
                    isLoading={this.props.areDefCodesLoading}
                    searchText=""
                    noResults={false}
                    labelComponent={<DEFCheckboxTreeLabel />}
                    onUncheck={this.stageFilter}
                    onCheck={this.stageFilter} />
                {this.props.counts.length > 0 && (
                    <div
                        className="selected-filters"
                        role="status">
                        {this.props.counts.map((node) => {
                            const label = `${node.label} (${node.count})`;
                            return (
                                <button
                                    key={uniqueId()}
                                    className="shown-filter-button"
                                    value={label}
                                    onClick={(e) => this.removeSelectedFilter(e, node)}
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
                <SubmitHint ref={(component) => {
                    this.hint = component;
                }} />
            </div>
        );
    }
}

DEFCheckboxTree.propTypes = {
    counts: PropTypes.arrayOf(PropTypes.shape({})),
    defCodes: PropTypes.arrayOf(PropTypes.object),
    areDefCodesLoading: PropTypes.bool,
    defCodeFetchError: PropTypes.string,
    checked: PropTypes.arrayOf(PropTypes.string),
    stageDef: PropTypes.func
};

const mapStateToProps = (state) => ({
    counts: state.filters.defCodes.toObject().counts,
    checked: state.filters.defCodes.toObject().require
});

const mapDispatchToProps = (dispatch) => ({
    stageDef: (require, exclude, counts) => dispatch(updateDefCodes(require, exclude, counts))
});

export default flowRight(
    withDefCodes,
    connect(mapStateToProps, mapDispatchToProps)
)(DEFCheckboxTree);
