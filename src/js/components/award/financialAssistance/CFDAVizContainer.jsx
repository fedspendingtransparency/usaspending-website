/**
  * CFDAVizContainer.jsx
  * Created by Jonathan Hill 03/17/20
  **/

import React from 'react';
import PropTypes from 'prop-types';
import CFDAViz from 'components/award/financialAssistance/CFDAViz';
import { calculateTreemapPercentage, formatMoney } from 'helpers/moneyFormatter';
import { cloneDeep, isEqual } from 'lodash';
// import FederalAccountsViz from 'components/award/shared/federalAccounts/FederalAccountsViz';

const propTypes = {
    cfdas: PropTypes.array,
    biggestCfda: PropTypes.object
};

export default class CFDAVizContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 10,
            sort: '_totalFundingAmount',
            page: 1,
            order: 'desc',
            total: props.cfdas.length,
            inFlight: false,
            error: false,
            allCFDAs: props.cfdas,
            currentPageCFDAs: [],
            cfda: {},
            view: 'table',
            previousView: 'table'
        };
    }

    componentDidMount = () => this.updateCFDAs(true);
    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.cfdas, this.props.cfdas)) {
            this.updateCFDAs(true);
        }
    }

    onTableClick = (e) => {
        e.preventDefault();
        const cfda = this.props.cfdas.find((data) => data.cfdaNumber === e.target.value);
        this.setState({ view: 'single', cfda });
    }

    onBackClick = (e) => {
        e.preventDefault();
        const { previousView } = this.state;
        this.setState({ view: previousView, previousView });
    }

    updateCFDAs = (isTrue) => {
        const data = [];
        if (isTrue) {
            for (let i = 0; i < 35; i++) {
                const newData = cloneDeep(this.props.cfdas[0]);
                newData.cfdaTitle = `${newData.cfdaTitle}----${i}`;
                newData.cfdaNumber = `${newData.cfdaNumber}----${i}`;
                data.push(newData);
            }
            this.setState({ allCFDAs: data, total: data.length });
        }
        let toSort = data;
        const {
            sort,
            order,
            page,
            limit,
            allCFDAs
        } = this.state;
        if (!isTrue) toSort = allCFDAs;
        let sortedCFDAs = null;
        if (order === 'desc') {
            sortedCFDAs = toSort.sort((a, b) => b[sort] - a[sort]);
        }
        else {
            sortedCFDAs = toSort.sort((a, b) => a[sort] - b[sort]);
        }
        const startIndex = (page - 1) * limit;
        const endIndex = ((page - 1) * limit) + limit;
        const currentPageCFDAs = sortedCFDAs.slice(startIndex, endIndex);
        this.setState({ currentPageCFDAs });
    }

    updateSort = (sort, order) => {
        this.setState({ sort, order }, () => this.updateCFDAs());
    }

    changePage = (page) => {
        this.setState({ page }, () => this.updateCFDAs());
    }

    changeView = (view) => {
        if (view !== this.state.view) this.setState({ view, previousView: view });
    }

    render() {
        return (
            <CFDAViz
                {...this.state}
                changePage={this.changePage}
                updateSort={this.updateSort}
                changeView={this.changeView}
                onTableClick={this.onTableClick}
                onBackClick={this.onBackClick} />
        );
    }
}

CFDAVizContainer.propTypes = propTypes;

