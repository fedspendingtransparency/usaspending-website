/**
  * FederalAccountsViz.jsx
  * Created by Lizzie Salita 8/19/19
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { Table, Tree } from 'components/sharedComponents/icons/Icons';
import ViewTypeButton from 'components/sharedComponents/buttons/ViewTypeButton';
import FederalAccountsTreeTooltip from
    './FederalAccountsTreeTooltip';
import FederalAccountsTable from './FederalAccountsTable';
import FederalAccountsTree from './FederalAccountsTree';

const propTypes = {
    inFlight: PropTypes.bool,
    error: PropTypes.bool,
    page: PropTypes.number,
    limit: PropTypes.number,
    sort: PropTypes.string,
    order: PropTypes.string,
    total: PropTypes.number,
    federalAccounts: PropTypes.array,
    changePage: PropTypes.func,
    updateSort: PropTypes.func
};

export default class FederalAccountsViz extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            view: 'tree',
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
        if (this.state.view !== view) {
            this.setState({
                view
            });
        }
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
        const isTreeView = this.state.view === 'tree';
        return (
            <div className="federal-accounts__section">
                {this.state.showTooltip && <FederalAccountsTreeTooltip {...this.state.tooltip} />}
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
                        error={this.props.error}
                        inFlight={this.props.inFlight}
                        width={this.state.width}
                        data={this.props.federalAccounts}
                        showTooltip={this.showTooltip}
                        hideTooltip={this.hideTooltip} />}
                </div>
            </div>
        );
    }
};

FederalAccountsViz.propTypes = propTypes;
