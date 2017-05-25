/**
* BudgetSubfunctions.jsx
* Created by Emily Gullo 05/15/2017
**/

import React from 'react';
import * as Icons from 'components/sharedComponents/icons/Icons';
import * as MoneyFormatter from 'helpers/moneyFormatter';

import BudgetFunctionsMinimized from './BudgetFunctionsMinimized';
import BudgetSubfunctionsDescription from './BudgetSubfunctionsDescription';
import TreeMapTooltip from './TreeMapTooltip';
import BudgetSubfunctionsMap from './BudgetSubfunctionsMap';

const propTypes = {
    categories: React.PropTypes.object,
    descriptions: React.PropTypes.array,
    colors: React.PropTypes.array,
    alternateColors: React.PropTypes.array,
    subfunctions: React.PropTypes.object,
    selected: React.PropTypes.string,
    selectedValue: React.PropTypes.number,
    selectedTotal: React.PropTypes.number,
    selectedDesc: React.PropTypes.string,
    changeActiveSubfunction: React.PropTypes.func,
    toggleSubfunction: React.PropTypes.func,
    toggleOverlay: React.PropTypes.func,
    tooltipStyles: React.PropTypes.object,
    total: React.PropTypes.number
};

const defaultProps = {

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
            direction: null
        };

        this.createTooltip = this.createTooltip.bind(this);
        this.showArrowTooltip = this.showArrowTooltip.bind(this);
        this.createArrowTooltip = this.createArrowTooltip.bind(this);
        this.changeActiveSubfunction = this.changeActiveSubfunction.bind(this);
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
            this.changeActiveSubfunction(set);
        }
        else if (direction === 'right') {
            set = {
                selected: this.props.selected,
                selectedValue: this.props.selectedValue,
                selectedTotal: this.props.selectedTotal,
                next: true,
                prev: false,
                showSub: true };
            this.changeActiveSubfunction(set);
        }
        else {
            this.props.toggleSubfunction();
        }
    }

    showArrowTooltip(direction) {
        this.setState({
            direction
        });
    }

    createArrowTooltip() {
        let tooltip = null;
        if (this.state.direction !== null) {
            tooltip = (<TreeMapTooltip
                name={this.state.direction}
                x={this.state.x}
                y={this.state.y}
                width={this.state.width}
                height={(this.state.height / 2) + 50}
                arrow />);
        }
        return tooltip;
    }

    createTooltip() {
        let tooltip = null;
        if (this.state.category !== 'none') {
            tooltip = (<TreeMapTooltip
                name={this.state.category}
                value={MoneyFormatter.formatTreemapValues(this.state.individualValue)}
                percentage={`${((this.state.individualValue / this.props.total) *
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

    render() {
        let minimized = null;
        if (window.innerWidth > 768) {
            minimized = (<BudgetFunctionsMinimized
                showSub={this.state.showSub}
                categories={this.props.categories}
                descriptions={this.props.descriptions}
                colors={this.props.colors}
                alternateColors={this.props.alternateColors}
                changeActiveSubfunction={this.changeActiveSubfunction}
                toggleOverlay={this.props.toggleOverlay}
                tooltipStyles={this.props.tooltipStyles}
                chosen={this.props.selected} />);
        }
        return (
            <div className="treemap-inner-wrap">
                { this.createArrowTooltip() }
                { this.createTooltip() }
                <button
                    className="back"
                    onClick={() => {
                        this.swapTiles('back');
                    }}
                    onMouseEnter={() => {
                        this.showArrowTooltip('back');
                    }}
                    onMouseLeave={() => {
                        this.showArrowTooltip(null);
                    }}>
                    <Icons.AngleUp />
                </button>
                <button
                    className="left"
                    onClick={() => {
                        this.swapTiles('left');
                    }}
                    onMouseEnter={() => {
                        this.showArrowTooltip('prev');
                    }}
                    onMouseLeave={() => {
                        this.showArrowTooltip(null);
                    }}>
                    <Icons.AngleLeft />
                </button>
                <button
                    className="right"
                    onClick={() => {
                        this.swapTiles('right');
                    }}
                    onMouseEnter={() => {
                        this.showArrowTooltip('next');
                    }}
                    onMouseLeave={() => {
                        this.showArrowTooltip(null);
                    }}>
                    <Icons.AngleRight />
                </button>
                { minimized }
                <BudgetSubfunctionsDescription
                    category={this.props.selected}
                    value={MoneyFormatter.formatTreemapValues(this.props.selectedValue)}
                    percentage={((this.props.selectedValue / this.props.selectedTotal) *
                        100).toFixed(1)}
                    description={this.props.selectedDesc} />
                <BudgetSubfunctionsMap
                    topFunction={this.props.selected}
                    subfunctions={this.props.subfunctions}
                    colors={this.props.colors}
                    showSub={this.props.showSubfunction}
                    tooltipStyles={this.props.tooltipStyles}
                    chosen={this.props.selected} />
            </div>
        );
    }

}
BudgetSubfunctions.propTypes = propTypes;

