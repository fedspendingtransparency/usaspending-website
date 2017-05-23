/**
 * TreeMap.jsx
 * Created by Emily Gullo 03/15/2017
 **/

import React from 'react';
import _ from 'lodash';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import * as Icons from 'components/sharedComponents/icons/Icons';

import BudgetFunctions from './BudgetFunctions';
import BudgetSubfunctions from './BudgetSubfunctions';

const propTypes = {
    categories: React.PropTypes.object,
    descriptions: React.PropTypes.array,
    colors: React.PropTypes.array,
    subfunctions: React.PropTypes.object,
    alternateColors: React.PropTypes.array,
    tooltipStyles: React.PropTypes.object
};

export default class TreeMap extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            descriptions: {},
            selected: 'none',
            selectedDesc: '',
            selectedValue: '',
            selectedTotal: 0,
            showSub: false
        };

        this.changeActiveSubfunction = this.changeActiveSubfunction.bind(this);
        this.toggleSubfunction = this.toggleSubfunction.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.descriptions !== this.state.descriptions) {
            this.setState({
                descriptions: nextProps.descriptions
            });
        }
    }

    toggleSubfunction(selected) {
        this.setState({
            showSub: !this.state.showSub,
            selected
        });
    }

    changeActiveSubfunction(set) {
        const descSet = this.props.descriptions;
        let newSelected = set.selected;
        let newValue = set.selectedValue;
        // find index of object item on matching cat name
        let descIndex = '0';
        if (set.showSub !== false) {
            if (set.selected !== 'none') {
                descIndex = _.findIndex(descSet, { name: newSelected });
            }
            if ((set.next && descIndex < 16) || (set.prev && descIndex > 0)) {
                if (set.next) {
                    descIndex += 1;
                    newSelected = descSet[descIndex].name;
                }
                if (set.prev) {
                    descIndex -= 1;
                    newSelected = descSet[descIndex].name;
                }
                newValue = this.props.categories.children[descIndex].value;
            }
        }

        // set values to state
        this.setState({
            selected: newSelected,
            selectedDesc: descSet[descIndex].value,
            selectedValue: newValue,
            selectedTotal: set.selectedTotal,
            showSub: set.showSub
        });
    }

    formatFriendlyString(value) {
        // format the ceiling and current values to be friendly strings
        const units = MoneyFormatter.calculateUnitForSingleValue(value);
        // only reformat at a million or higher
        if (units.unit < MoneyFormatter.unitValues.MILLION) {
            units.unit = 1;
            units.unitLabel = '';
            units.longLabel = '';
        }
        const formattedValue = value / units.unit;
        let precision = 1;
        if (formattedValue % 1 === 0) {
            // whole number
            precision = 0;
        }

        const formattedCurrency =
        MoneyFormatter.formatMoneyWithPrecision(formattedValue, precision);

        // don't add an extra space when there's no units string to display
        let longLabel = '';
        if (units.unit > 1) {
            longLabel = ` ${units.longLabel}`;
        }

        return `${formattedCurrency}${longLabel}`;
    }

    render() {
        let functions = (<BudgetFunctions
            categories={this.props.categories}
            descriptions={this.props.descriptions}
            colors={this.props.colors}
            alternateColors={this.props.alternateColors}
            toggleSubfunction={this.toggleSubfunction}
            changeActiveSubfunction={this.changeActiveSubfunction}
            tooltipStyles={this.props.tooltipStyles}
            formatFriendlyString={this.formatFriendlyString} />);
        if (this.state.showSub === true) {
            functions = (<BudgetSubfunctions
                showSub={this.state.showSub}
                subfunctions={this.props.subfunctions}
                colors={this.props.colors}
                categories={this.props.categories}
                descriptions={this.props.descriptions}
                alternateColors={this.props.alternateColors}
                selected={this.state.selected}
                selectedDesc={this.state.selectedDesc}
                selectedValue={this.state.selectedValue}
                selectedTotal={this.state.selectedTotal}
                changeActiveSubfunction={this.changeActiveSubfunction}
                tooltipStyles={this.props.tooltipStyles}
                formatFriendlyString={this.formatFriendlyString} />);
        }
        return (
            <div className="usa-da-treemap-section">
                <div className="tree-desc">
                    <b>3</b> of the <b>19</b> total budget functions, accounted for about
                    &nbsp;<b>1/2</b> of total spending. <br />
                    <span className="highlight">Social Security</span>,&nbsp;
                    <span className="highlight">National Defense</span>,
                    and <span className="highlight">Medicare</span>.
                </div>

                {functions}
                <div className="source">
                    Source: Monthly Treasury Statement
                    <div className="info-icon-circle">
                        <Icons.InfoCircle />
                    </div>
                    <div className="more-icon">
                        <Icons.MoreOptions />
                    </div>
                </div>
            </div>
        );
    }

}
TreeMap.propTypes = propTypes;
