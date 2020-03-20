/**
  * CFDAVizContainer.jsx
  * Created by Jonathan Hill 03/17/20
  **/

import React from 'react';
import PropTypes from 'prop-types';
import CFDAViz from 'components/award/financialAssistance/CFDAViz';
import { isEqual } from 'lodash';

const propTypes = {
    cfdas: PropTypes.array,
    biggestCfda: PropTypes.object
};

export default class CFDAVizContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 10,
            sort: '_federalActionOblicationAmount',
            page: 1,
            order: 'desc',
            total: props.cfdas.length,
            inFlight: false,
            error: false,
            currentPageCFDAs: [],
            cfda: props.cfdas.length === 1 ? props.cfdas[0] : {},
            view: props.cfdas.length === 1 ? '' : 'table',
            previousView: 'table'
        };
    }

    componentDidMount = () => this.updateCFDAs();
    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.cfdas, this.props.cfdas)) {
            this.updateCFDAs();
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

    updateCFDAs = () => {
        const {
            sort,
            order,
            page,
            limit
        } = this.state;
        const { cfdas } = this.props;
        let sortedCFDAs = null;
        if (order === 'desc') {
            const sortFunction = sort === 'cfdaTitle' ?
                (a, b) => b[sort].localeCompare(a[sort]) :
                (a, b) => b[sort] - a[sort];
            sortedCFDAs = cfdas.sort(sortFunction);
        }
        else {
            const sortFunction = sort === 'cfdaTitle' ?
                (a, b) => a[sort].localeCompare(b[sort]) :
                (a, b) => a[sort] - b[sort];
            sortedCFDAs = cfdas.sort(sortFunction);
        }
        const startIndex = (page - 1) * limit;
        const endIndex = ((page - 1) * limit) + limit;
        const currentPageCFDAs = sortedCFDAs.slice(startIndex, endIndex);
        return this.setState({ currentPageCFDAs });
    }

    updateSort = (sort, order) => {
        this.setState({ sort, order, page: 1 }, () => this.updateCFDAs());
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
                onBackClick={this.onBackClick}
                allCFDAs={this.props.cfdas} />
        );
    }
}

CFDAVizContainer.propTypes = propTypes;

