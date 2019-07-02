import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Table, Tree } from 'components/sharedComponents/icons/Icons';
import ViewTypeButton from 'components/sharedComponents/buttons/ViewTypeButton';
import FederalAccountsTreeTooltip from
    'components/awardv2/idv/federalAccounts/FederalAccountsTreeTooltip';
import FederalAccountsTable from './FederalAccountsTable';
import FederalAccountsTree from './FederalAccountsTree';
import FederalAccountsSummary from './FederalAccountsSummary';


const propTypes = {
    totalTransactionObligatedAmount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    inFlight: PropTypes.bool,
    inFlightTreemap: PropTypes.bool,
    error: PropTypes.bool,
    errorTreemap: PropTypes.bool,
    page: PropTypes.number,
    limit: PropTypes.number,
    sort: PropTypes.string,
    order: PropTypes.string,
    total: PropTypes.number,
    federalAccounts: PropTypes.array,
    allFederalAccounts: PropTypes.array,
    changePage: PropTypes.func,
    updateSort: PropTypes.func,
    isTreeView: PropTypes.bool,
    changeView: PropTypes.func
};

export default class FederalAccountsSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            isTreeView: true,
            showTooltip: false,
            tooltip: {
                x: 0,
                y: 0,
                _federalAccountName: '',
                _obligatedAmount: 0,
                _percent: 0,
                _fundingAgencyName: '',
                _fundingAgencyAbbreviation: '',
                _fundingAgencyId: 0,
                federalAccountName: '',
                obligatedAmount: 0,
                percent: 0,
                fundingAgencyName: '',
                fundingAgencyAbbreviation: '',
                fundingAgencyId: 0
            }
        };

        this.measureWidth = this.measureWidth.bind(this);
        this.changeView = this.changeView.bind(this);
        this.showTooltip = this.showTooltip.bind(this);
        this.hideTooltip = this.hideTooltip.bind(this);
    }

    componentDidMount() {
        this.measureWidth();
        window.addEventListener('resize', this.measureWidth);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.measureWidth);
    }

    measureWidth() {
        const width = this.widthRef.offsetWidth;
        this.setState({
            width
        });
    }

    changeView(view) {
        const truth = view === 'tree';
        if (this.state.isTreeView === truth) return;
        this.setState((state) => ({ isTreeView: !state.isTreeView }));
    }

    showTooltip(position, data) {
        this.setState({
            showTooltip: true,
            tooltip: { ...position, ...data }
        });
    }

    hideTooltip() {
        this.setState({
            showTooltip: false
        });
    }

    render() {
        const { isTreeView } = this.state;
        return (
            <div className="award__col award-viz federal-accounts">
                {this.state.showTooltip && <FederalAccountsTreeTooltip {...this.state.tooltip} />}
                <div className="award__col__content">
                    <div className="award-viz__heading">
                        <div className="award-viz__icon">
                            <FontAwesomeIcon size="lg" icon="chart-pie" />
                        </div>
                        <h3 className="award-viz__title">Federal Accounts</h3>
                    </div>
                    <hr />
                    <div className="federal-accounts__section">
                        <div className="federal-accounts-results">
                            <div className="view-buttons">
                                <ViewTypeButton
                                    value="tree"
                                    label="Treemap"
                                    icon={<Tree alt="Treemap Icon" />}
                                    changeView={this.changeView}
                                    active={isTreeView} />
                                <ViewTypeButton
                                    value="table"
                                    label="Table"
                                    icon={<Table alt="Table Icon" />}
                                    changeView={this.changeView}
                                    active={!isTreeView} />
                            </div>
                            {!isTreeView && <FederalAccountsTable {...this.props} />}
                            <div
                                className="federal-accounts-vis__width-reference"
                                ref={(div) => {
                                    this.widthRef = div;
                                }} />
                            {isTreeView && <FederalAccountsTree
                                allFederalAccounts={this.props.allFederalAccounts}
                                error={this.props.errorTreemap}
                                inFlight={this.props.inFlightTreemap}
                                width={this.state.width}
                                data={this.props.allFederalAccounts}
                                total={this.props.totalTransactionObligatedAmount}
                                showTooltip={this.showTooltip}
                                hideTooltip={this.hideTooltip} />}
                        </div>
                    </div>
                    <span className="federal-accounts__section--note">
                        <strong>NOTE: </strong>Result count may differ between treemap view and table view. Treemap view only displays accounts with a positive combined obligated amount, while table view displays all accounts.
                    </span>
                    <FederalAccountsSummary {...this.props} />
                </div>
            </div>
        );
    }
};

FederalAccountsSection.propTypes = propTypes;
