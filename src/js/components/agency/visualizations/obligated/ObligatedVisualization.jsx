/**
 * ObligatedVisualization.jsx
 * Created by Lizzie Salita 6/8/17
 */

import React from 'react';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import _ from 'lodash';

import AgencyObligatedGraph from './ObligatedGraph';

const propTypes = {
    activeFY: React.PropTypes.number,
    agency: React.PropTypes.string,
    obligatedAmount: React.PropTypes.number,
    budgetAuthority: React.PropTypes.number
};

export default class AgencyObligatedAmount extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            visualizationWidth: 0
        };

        this.handleWindowResize = _.throttle(this.handleWindowResize.bind(this), 50);
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
                visualizationWidth: this.sectionHr.offsetWidth
            });
        }
    }

    render() {
        const obligatedValue = this.props.obligatedAmount;
        const authorityValue = this.props.budgetAuthority;

        const authUnits = MoneyFormatter.calculateUnitForSingleValue(authorityValue);
        const authority = `${MoneyFormatter.formatMoney(authorityValue / authUnits.unit)}
        ${authUnits.longLabel}`;

        const obUnits = MoneyFormatter.calculateUnitForSingleValue(obligatedValue);

        const amountObligated = `${MoneyFormatter.formatMoney(obligatedValue / obUnits.unit)}
        ${obUnits.longLabel}`;

        return (
            <div className="agency-obligated-wrapper">
                <div className="agency-obligated-title">
                    <h4 >Obligated Amount</h4>
                    <hr
                        className="results-divider"
                        ref={(hr) => {
                            this.sectionHr = hr;
                        }} />
                </div>
                <div className="agency-obligated-content">
                    <p className="fy-text">
                        In Fiscal Year {this.props.activeFY}*, {this.props.agency} has obligated
                    </p>
                    <p className="against-auth-text">
                        <span className="number number-bolder">{amountObligated}</span> against its <span className="number">{authority}</span> in Budget Authority
                    </p>
                    <AgencyObligatedGraph
                        activeFY={this.props.activeFY}
                        obligatedAmount={this.props.obligatedAmount}
                        budgetAuthority={this.props.budgetAuthority}
                        width={this.state.visualizationWidth}
                        obligatedText={amountObligated} />
                    <p>
                        This {amountObligated} in obligations is divided among
                        categories, called object classes. These groupings can be helpful for analysis and cross-agency
                        comparison.
                    </p>
                </div>
            </div>
        );
    }
}

AgencyObligatedAmount.propTypes = propTypes;
