/**
 * FederalAccountVisualization.jsx
 * Created by Kevin Li 6/29/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as MoneyFormatter from 'helpers/moneyFormatter';

import FederalAccountChart from './FederalAccountChart';

const propTypes = {
    obligatedAmount: PropTypes.number,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    linkSeries: PropTypes.array,
    labelSeries: PropTypes.array,
    dataSeries: PropTypes.array,
    descriptions: PropTypes.array,
    asOfDate: PropTypes.string
};

export default class FederalAccountVisualization extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            visualizationWidth: 0,
            labelWidth: 0
        };

        this.handleWindowResize = this.handleWindowResize.bind(this);
    }

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    handleWindowResize() {
        // determine if the width changed
        const windowWidth = window.innerWidth;
        if (this.state.windowWidth !== windowWidth) {
            // width changed, update the visualization width
            this.setState({
                windowWidth,
                visualizationWidth: this.sectionHr.offsetWidth,
                labelWidth: Math.min(this.sectionHr.offsetWidth / 3, 270)
            });
        }
    }
    render() {
        const obUnits = MoneyFormatter.calculateUnitForSingleValue(this.props.obligatedAmount);
        const formattedObligation = `${MoneyFormatter.formatMoney(this.props.obligatedAmount / obUnits.unit)} ${obUnits.longLabel}`;

        return (
            <div
                className="agency-section-wrapper"
                id="agency-federal-accounts">
                <div className="agency-callout-description">
                    <p>
                        This {formattedObligation} in obligations is broken out in multiple <strong>federal accounts</strong> that are helpful in understanding what the agency broadly spends its money on. You can drill-down further into a federal account to view its program activities, which are at a more granular level.
                    </p>
                </div>
                <div className="agency-section-title">
                    <h4>Federal Accounts</h4>
                    <em>Data as of {this.props.asOfDate}</em>
                    <hr
                        className="results-divider"
                        ref={(hr) => {
                            this.sectionHr = hr;
                        }} />
                </div>
                <div className="agency-section-content">
                    <div className="chart-wrapper">
                        <FederalAccountChart
                            loading={this.props.loading}
                            linkSeries={this.props.linkSeries}
                            labelSeries={this.props.labelSeries}
                            dataSeries={this.props.dataSeries}
                            descriptions={this.props.descriptions}
                            width={this.state.visualizationWidth}
                            labelWidth={this.state.labelWidth} />
                    </div>
                </div>
            </div>
        );
    }
}

FederalAccountVisualization.propTypes = propTypes;
