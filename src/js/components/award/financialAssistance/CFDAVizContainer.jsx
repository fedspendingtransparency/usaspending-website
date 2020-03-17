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
            sort: 'total_transaction_obligated_amount',
            page: 1,
            order: 'desc',
            total: 0,
            inFlight: false,
            error: false,
            cfdas: props.cfdas,
            view: 'table'
        };
    }

    componentDidMount = () => this.addPercentOfTotalFunding();

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.cfdas, this.props.cfdas)) this.addPercentOfTotalFunding();
    }

    onClick = () => {
        return null;
    }

    updateSort = (sort, order) => {
        return null;
        // this.setState({ sort, order }, () => this.getFederalAccounts());
    }

    changePage = (page) => {
        return null;
        // this.setState({ page }, () => this.getFederalAccounts());
    }

    changeView = (view) => {
        return null;
        // if (this.state.view !== view) {
        //     const limit = view === 'tree' ? 100 : 10;
        //     this.setState({
        //         view,
        //         limit
        //     }, () => {
        //         this.getFederalAccounts();
        //     });
        // }
    }

    addPercentOfTotalFunding = () => {
        const cfdas = this.props.cfdas.map((cfda) => {
            const newCFDA = cloneDeep(cfda);
            const { total_funding_amount: amount, federal_action_obligation_amount: total } = cfda;
            if (amount && (total && total !== 0)) {
                newCFDA.percent_of_total = calculateTreemapPercentage(amount, total);
            }
            else if (amount === 0) {
                newCFDA.percent_of_total = '0%';
            }
            else {
                newCFDA.percent_of_total = '--';
            }
            newCFDA.total_funding_amount = amount ? formatMoney(amount) : '--';
            return newCFDA;
        });
        this.setState({ cfdas });
    };

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

