import React from 'react';
import { isCancel } from 'axios';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { uniqueId, get } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchDEFCodes } from 'helpers/disasterHelper';
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

const parseCovidCodes = (codes) => codes.filter((code) => code.disaster === 'covid_19')
    .reduce((acc, covidCode) => ({
        ...acc,
        children: acc.children.concat([{
            label: covidCode.title,
            subLabel: covidCode.public_law,
            value: covidCode.code,
            expandDisabled: true
        }])
    }), covidParentNode);

const defaultExpanded = ['COVID'];
const countLabel = { value: 'COVID-19', count: 0, label: 'COVID-19 Spending' };

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

    componentDidMount() {
        this.fetchCodes();
    }

    stageFilter = (newChecked) => {
        const newCount = newChecked.reduce((acc) => acc + 1, 0);
        if (newCount > 0) {
            this.props.stageDef(
                newChecked,
                [],
                [{ ...countLabel, count: newCount }]
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

    fetchCodes = async () => {
        if (this.request) {
            this.request.cancel();
        }
        this.request = fetchDEFCodes();
        this.setState({ isLoading: true });
        try {
            const { data: { codes: allDisasterCodes } } = await this.request.promise;
            const covidCodes = parseCovidCodes(allDisasterCodes);
            this.setState({
                nodes: [covidCodes],
                isLoading: false
            });
        }
        catch (e) {
            console.log('Error fetching Def Codes ', e);
            if (!isCancel(e)) {
                this.setState({
                    isLoading: false,
                    isError: true,
                    errorMessage: get(e, 'message', 'There was an error, please refresh the browser.')
                });
            }
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
                    data={this.state.nodes}
                    isError={this.state.isError}
                    errorMessage={this.state.errorMessage}
                    isLoading={this.state.isLoading}
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
                            const label = `${node.value} - ${node.label} (${node.count})`;
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
};

DEFCheckboxTree.propTypes = {
    counts: PropTypes.arrayOf(PropTypes.shape({})),
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

export default connect(mapStateToProps, mapDispatchToProps)(DEFCheckboxTree);
