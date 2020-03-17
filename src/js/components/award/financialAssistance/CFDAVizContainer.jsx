/**
  * CFDAVizContainer.jsx
  * Created by Jonathan Hill 03/17/20
  **/

import React from 'react';
import PropTypes from 'prop-types';
import CFDAViz from 'components/award/financialAssistance/CFDAViz';
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
            sort: 'total_transaction_obligated_amount',
            page: 1,
            order: 'desc',
            total: 0,
            inFlight: false,
            error: false,
            cfdas: [],
            view: 'table'
        };
    }

    updateSort = (sort, order) => {
        this.setState({ sort, order }, () => this.getFederalAccounts());
    }

    changePage = (page) => {
        this.setState({ page }, () => this.getFederalAccounts());
    }

    changeView = (view) => {
        if (this.state.view !== view) {
            const limit = view === 'tree' ? 100 : 10;
            this.setState({
                view,
                limit
            }, () => {
                this.getFederalAccounts();
            });
        }
    }

    render() {
        return (
            <CFDAViz
                {...this.state}
                changePage={this.changePage}
                updateSort={this.updateSort}
                changeView={this.changeView} />
        );
    }
}

CFDAVizContainer.propTypes = propTypes;

