/**
* CFDAViz.jsx
* Created by Jonathan Hill 03/17/20
**/

import React from 'react';
import PropTypes from 'prop-types';
import ViewTypeButton from 'components/sharedComponents/buttons/ViewTypeButton';
// import FederalAccountsTreeTooltip from './FederalAccountsTreeTooltip';
// import FederalAccountsTable from './FederalAccountsTable';
import CFDATable from './CFDATable';
// import FederalAccountsTree from './FederalAccountsTree';

const propTypes = {
    inFlight: PropTypes.bool,
    error: PropTypes.bool,
    page: PropTypes.number,
    limit: PropTypes.number,
    sort: PropTypes.string,
    order: PropTypes.string,
    total: PropTypes.number,
    cfdas: PropTypes.array,
    view: PropTypes.string,
    changePage: PropTypes.func,
    updateSort: PropTypes.func,
    changeView: PropTypes.func,
    onClick: PropTypes.func
};

export default class CFDAViz extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 0,
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
    }

    componentDidMount() {
        this.measureWidth();
        window.addEventListener('resize', this.measureWidth);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.measureWidth);
    }

    measureWidth = () => {
        const width = this.widthRef.offsetWidth;
        this.setState({
            width
        });
    }

    showTooltip = (position, data) => {
        this.setState({
            showTooltip: true,
            tooltip: { ...position, ...data }
        });
    }

    hideTooltip = () => {
        this.setState({
            showTooltip: false
        });
    }

    render() {
        const isTreeView = this.props.view === 'tree';
        return (
            <div className="cfda-section__viz">
                {/* {this.state.showTooltip && <FederalAccountsTreeTooltip {...this.state.tooltip} />} */}
                <div className="cfda-section-results">
                    <div className="view-buttons-section">
                        <div className="view-buttons-section__text">Click on a program title to see its details.</div>
                        <div className="view-buttons-section__buttons">
                            <ViewTypeButton
                                value="table"
                                label="Table"
                                icon="table"
                                changeView={this.props.changeView}
                                active={!isTreeView} />
                            <ViewTypeButton
                                disabled
                                value="tree"
                                label="Treemap"
                                icon="th-large"
                                changeView={this.props.changeView}
                                active={isTreeView} />
                        </div>
                    </div>
                    {!isTreeView && <CFDATable {...this.props} />}
                    <div
                        className="cfda-section-vis__width-reference"
                        ref={(div) => {
                            this.widthRef = div;
                        }} />
                    {/* {isTreeView && <FederalAccountsTree
                        error={this.props.error}
                        inFlight={this.props.inFlight}
                        width={this.state.width}
                        data={this.props.federalAccounts}
                        showTooltip={this.showTooltip}
                        hideTooltip={this.hideTooltip} />} */}
                </div>
            </div>
        );
    }
}

CFDAViz.propTypes = propTypes;
