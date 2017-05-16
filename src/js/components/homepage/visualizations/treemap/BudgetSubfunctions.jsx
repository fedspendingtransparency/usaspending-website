/**
* BudgetSubfunctions.jsx
* Created by Emily Gullo 05/15/2017
**/

import React from 'react';
import _ from 'lodash';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import * as Icons from 'components/sharedComponents/icons/Icons';

import BudgetFunctionsMinimized from './BudgetFunctionsMinimized';
import BudgetSubfunctionsDescription from './BudgetSubfunctionsDescription';
import TreeMapTooltip from './TreeMapTooltip';
import SubTreeMap from './SubTreeMap';

const propTypes = {
    categories: React.PropTypes.object,
    descriptions: React.PropTypes.array,
    colors: React.PropTypes.array,
    alternateColors: React.PropTypes.array,
    subfunctions: React.PropTypes.object,
    showOverlay: React.PropTypes.bool,
    showSub: React.PropTypes.bool,
    selected: React.PropTypes.string,
    selectedValue: React.PropTypes.number,
    selectedTotal: React.PropTypes.number,
    selectedDesc: React.PropTypes.string,
    changeActiveSubfunction: React.PropTypes.func
};

export default class BudgetSubfunctions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            visualizationWidth: 0,
            visualizationHeight: 565,
            category: 'none',
            description: '',
            descriptions: {},
            finalNodes: '',
            individualValue: '',
            showOverlay: this.props.showOverlay,
            showSub: this.props.showSub
        };

        this.createTooltip = this.createTooltip.bind(this);
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

    swapTiles(direction) {
        let set = null;
        if (direction === 'left') {
            set = {
                selected: this.props.selected,
                selectedValue: this.props.selectedValue,
                selectedTotal: this.props.selectedTotal,
                next: false,
                prev: true,
                showSub: true };
        }
        else if (direction === 'right') {
            set = {
                selected: this.props.selected,
                selectedValue: this.props.selectedValue,
                selectedTotal: this.props.selectedTotal,
                next: true,
                prev: false,
                showSub: true };
        }
        else {
            set = {
                selected: null,
                selectedValue: null,
                selectedTotal: null,
                next: null,
                prev: null,
                showSub: false };
        }
        this.props.changeActiveSubfunction(set);
    }

    showArrows() {
        const buttonArray = [];
        let left = null;
        let right = null;
        let back = null;
        if (this.state.showSub === true) {
            left = (<Icons.AngleLeft />);
            right = (<Icons.AngleRight />);
            back = (<Icons.AngleUp />);
        }
        buttonArray.push(left);
        buttonArray.push(right);
        buttonArray.push(back);
        return buttonArray;
    }


    createTooltip() {
        let tooltip = null;
        if (this.state.category !== 'none') {
            tooltip = (<TreeMapTooltip
                name={this.state.category}
                value={this.formatFriendlyString(this.state.individualValue)}
                percentage={`${((this.state.individualValue / this.state.total) *
                    100).toFixed(1)}%`}
                description={this.state.description}
                x={this.state.x}
                y={this.state.y}
                width={this.state.width}
                height={(this.state.height / 2) + 50}
                showSub={this.state.showSub} />);
        }
        return tooltip;
    }

    render() {
        return (
            <div className="treemap-inner-wrap">
                { this.createTooltip() }
                <button
                    className="back"
                    onClick={() => {
                        this.swapTiles('back');
                    }}>
                    {this.showArrows()[2]}
                </button>
                <button
                    className="left"
                    onClick={() => {
                        this.swapTiles('left');
                    }}>
                    {this.showArrows()[0]}
                </button>
                <button
                    className="right"
                    onClick={() => {
                        this.swapTiles('right');
                    }}>
                    {this.showArrows()[1]}
                </button>
                <BudgetFunctionsMinimized
                    showSub={this.state.showSub}
                    categories={this.props.categories}
                    descriptions={this.props.descriptions}
                    colors={this.props.colors}
                    alternateColors={this.props.alternateColors}
                    changeActiveSubfunction={this.props.changeActiveSubfunction} />
                <BudgetSubfunctionsDescription
                    category={this.props.selected}
                    value={this.formatFriendlyString(this.props.selectedValue)}
                    percentage={((this.props.selectedValue / this.props.selectedTotal) *
                        100).toFixed(1)}
                    description={this.props.selectedDesc} />
                <SubTreeMap
                    topFunction={this.props.selected}
                    subfunctions={this.props.subfunctions}
                    colors={this.props.colors} />
            </div>
        );
    }

}
BudgetSubfunctions.propTypes = propTypes;

