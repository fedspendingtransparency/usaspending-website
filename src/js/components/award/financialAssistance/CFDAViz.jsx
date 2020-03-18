/**
* CFDAViz.jsx
* Created by Jonathan Hill 03/17/20
**/

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ViewTypeButton from 'components/sharedComponents/buttons/ViewTypeButton';
import SingleCFDA from 'components/award/financialAssistance/SingleCFDA';
import FederalAccountsTreeTooltip from '../shared/federalAccounts/FederalAccountsTreeTooltip';
import FederalAccountsTree from '../shared/federalAccounts/FederalAccountsTree';
import CFDATable from './CFDATable';

const propTypes = {
    inFlight: PropTypes.bool,
    error: PropTypes.bool,
    page: PropTypes.number,
    limit: PropTypes.number,
    sort: PropTypes.string,
    order: PropTypes.string,
    total: PropTypes.number,
    allCFDAs: PropTypes.array,
    currentPageCFDAs: PropTypes.array,
    cfda: PropTypes.object,
    view: PropTypes.string,
    changePage: PropTypes.func,
    updateSort: PropTypes.func,
    changeView: PropTypes.func,
    onTableClick: PropTypes.func,
    onBackClick: PropTypes.func
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

    tree = () => {
        if (this.props.view === 'tree') {
            return (<FederalAccountsTree
                error={this.props.error}
                inFlight={this.props.inFlight}
                width={this.state.width}
                data={this.props.currentPageCFDAs}
                showTooltip={this.showTooltip}
                hideTooltip={this.hideTooltip} />);
        }
        return null;
    }

    content = () => {
        const { view } = this.props;
        if (view === 'table') return (<CFDATable {...this.props} />);
        if (view === 'single') return (<SingleCFDA data={this.props.cfda} />);
        return null;
    }

    buttons = () => {
        const { view, allCFDAs } = this.props;
        const isTreeView = this.props.view === 'tree';
        if (view === 'tree' || view === 'table') {
            return (
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
            );
        }
        // if (view === 'single' && cfdas.length)
        if (view === 'single') {
            return (
                <div className="view-buttons-section">
                    <button onClick={this.props.onBackClick} className="view-buttons-section__back award-viz__button">
                        <div className="view-buttons-section__back-icon">
                            <FontAwesomeIcon icon="arrow-circle-left" />
                        </div>
                        <div className="view-buttons-section__back-text">Back to all CFDA programs</div>
                    </button>
                </div>
            );
        }
        return null;
    }

    render() {
        return (
            <div className="cfda-section__viz">
                {this.state.showTooltip && <FederalAccountsTreeTooltip {...this.state.tooltip} />}
                <div className="cfda-section-results">
                    {this.buttons()}
                    {this.content()}
                    <div
                        className="cfda-section-vis__width-reference"
                        ref={(div) => {
                            this.widthRef = div;
                        }} />
                    {this.tree()}
                </div>
            </div>
        );
    }
}

CFDAViz.propTypes = propTypes;
