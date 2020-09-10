import React from 'react';
import { isCancel } from 'axios';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { get } from 'lodash';

import { fetchDEFCodes } from 'helpers/disasterHelper';
import CheckboxTree from 'components/sharedComponents/CheckboxTree';
import { setDefCodes } from 'redux/actions/bulkDownload/bulkDownloadActions';
import DEFCheckboxTreeLabelDownload from './DEFCheckboxTreeLabelDownload';

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
            .sort((a, b) => {
                if (a.value < b.value) return -1;
                if (a.value > b.value) return 1;
                return 0;
            })
    }), covidParentNode);
const defaultExpanded = ['COVID'];

export class DEFCheckboxTreeDownload extends React.Component {
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

    stageFilter = () => {
        this.props.stageDef(
            [],
            [],
            []
        );
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
            <div className="def-code-filter-download">
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
                    labelComponent={<DEFCheckboxTreeLabelDownload />}
                    onUncheck={this.stageFilter}
                    onCheck={this.stageFilter} />
            </div>
        );
    }
};

DEFCheckboxTreeDownload.propTypes = {
    counts: PropTypes.arrayOf(PropTypes.shape({})),
    checked: PropTypes.arrayOf(PropTypes.string),
    stageDef: PropTypes.func,
    setDefCodes: PropTypes.func
};

const mapStateToProps = (state) => ({
    counts: state.filters.defCodes.toObject().counts,
    checked: state.filters.defCodes.toObject().require
});

const mapDispatchToProps = (dispatch) => ({
    stageDef: (require, checked) => dispatch(setDefCodes("account", checked))
});

export default connect(mapStateToProps, mapDispatchToProps)(DEFCheckboxTreeDownload);
