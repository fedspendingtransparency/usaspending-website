/**
* CFDAViz.jsx
* Created by Jonathan Hill 03/17/20
**/

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Picker } from 'data-transparency-ui';
import { cloneDeep } from 'lodash';
import ViewTypeButton from 'components/sharedComponents/buttons/ViewTypeButton';
import SingleCFDA from 'components/award/financialAssistance/SingleCFDA';
import CFDATree from './CFDATree';
import CFDATable from './CFDATable';
import CFDATreeTooltip from './CFDATreeTooltip';

const propTypes = {
    inFlight: PropTypes.bool,
    error: PropTypes.bool,
    page: PropTypes.number,
    limit: PropTypes.number,
    sort: PropTypes.string,
    order: PropTypes.string,
    total: PropTypes.number,
    allCFDAs: PropTypes.array,
    awardTotalObligation: PropTypes.number,
    currentPageCFDAs: PropTypes.array,
    cfda: PropTypes.object,
    view: PropTypes.string,
    changePage: PropTypes.func,
    updateSort: PropTypes.func,
    changeView: PropTypes.func,
    onTableClick: PropTypes.func,
    onBackClick: PropTypes.func,
    onTreeClick: PropTypes.func,
    onDropdownClick: PropTypes.func
};

const sortFunction = (a, b) => parseFloat(a.cfdaNumber) - parseFloat(b.cfdaNumber);

export default class CFDAViz extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            showTooltip: false,
            tooltip: {
                x: 0,
                y: 0,
                cfdaTitle: '',
                federalActionOblicationAmount: 0,
                percentOfTotal: 0,
                cfdaFederalAgency: '',
                cfdaNumber: 0
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
    };

    showTooltip = (position, data) => {
        this.setState({
            showTooltip: true,
            tooltip: { ...position, ...data }
        });
    };

    hideTooltip = () => {
        this.setState({
            showTooltip: false
        });
    };

    tree = () => {
        if (this.props.view === 'tree') {
            return (<CFDATree
                error={this.props.error}
                inFlight={this.props.inFlight}
                width={this.state.width}
                data={this.props.allCFDAs}
                showTooltip={this.showTooltip}
                hideTooltip={this.hideTooltip}
                onTreeClick={this.props.onTreeClick} />);
        }
        return null;
    };

    content = () => {
        const { view } = this.props;
        if (view === 'table') return (<CFDATable {...this.props} />);
        if (view === 'single' || !view) return (<SingleCFDA currentCfda={this.props.cfda} />);
        return null;
    };

    title = () => {
        const {
            cfda,
            view,
            allCFDAs,
            onDropdownClick
        } = this.props;
        if (view === 'single' || !view) {
            if (allCFDAs.length > 1) {
                const options = cloneDeep(allCFDAs)
                    .sort((a, b) => parseFloat(a.cfdaNumber) - parseFloat(b.cfdaNumber))
                    .map((x) => ({
                        name: `${x.cfdaNumber} ${x.cfdaTitle}`,
                        onClick: onDropdownClick
                    }));
                return (<Picker
                    options={options}
                    dropdownDirection="right"
                    backgroundColor="#215493"
                    selectedOption={`${cfda.cfdaNumber} ${cfda.cfdaTitle}`}
                    sortFn={sortFunction} />);
            }
            return (<h4 className="cfda-section-single-title">{`${cfda.cfdaNumber}: ${cfda.cfdaTitle.toUpperCase()}`}</h4>);
        }
        return null;
    };

    buttons = () => {
        const { view, allCFDAs } = this.props;
        const isTreeView = this.props.view === 'tree';
        if (view === 'tree' || view === 'table') {
            return (
                <div className="view-buttons-section">
                    <div className="view-buttons-section__text">{`Click on a program ${isTreeView ? 'tile' : 'title'} to see its details.`}</div>
                    <div className="view-buttons-section__buttons">
                        <ViewTypeButton
                            value="table"
                            label="Table"
                            icon="table"
                            changeView={this.props.changeView}
                            active={!isTreeView} />
                        <ViewTypeButton
                            value="tree"
                            label="Treemap"
                            icon="th-large"
                            changeView={this.props.changeView}
                            active={isTreeView} />
                    </div>
                </div>
            );
        }
        if (view === 'single' && allCFDAs.length) {
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
    };

    render() {
        return (
            <div className="cfda-section__viz">
                {this.state.showTooltip && <CFDATreeTooltip {...this.state.tooltip} />}
                <div className="cfda-section-results">
                    {this.buttons()}
                    {this.title()}
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
