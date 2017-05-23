/**
* BudgetSubfunctions.jsx
* Created by Emily Gullo 05/15/2017
**/

import React from 'react';
import * as Icons from 'components/sharedComponents/icons/Icons';

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
    showSub: React.PropTypes.bool,
    selected: React.PropTypes.string,
    selectedValue: React.PropTypes.number,
    selectedTotal: React.PropTypes.number,
    selectedDesc: React.PropTypes.string,
    changeActiveSubfunction: React.PropTypes.func,
    toggleOverlay: React.PropTypes.func,
    tooltipStyles: React.PropTypes.object,
    formatFriendlyString: React.PropTypes.func
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
            showSub: this.props.showSub,
            direction: null
        };
        this.createTooltip = this.createTooltip.bind(this);
        this.showArrowTooltip = this.showArrowTooltip.bind(this);
        this.createArrowTooltip = this.createArrowTooltip.bind(this);
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
                value={this.props.formatFriendlyString(this.state.individualValue)}
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
        let minimized = null;
        if (window.innerWidth > 768) {
            minimized = (<BudgetFunctionsMinimized
                showSub={this.state.showSub}
                categories={this.props.categories}
                descriptions={this.props.descriptions}
                colors={this.props.colors}
                alternateColors={this.props.alternateColors}
                changeActiveSubfunction={this.props.changeActiveSubfunction}
                toggleOverlay={this.props.toggleOverlay}
                tooltipStyles={this.props.tooltipStyles}
                chosen={this.props.selected}
                formatFriendlyString={this.props.formatFriendlyString} />);
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
                    value={this.props.formatFriendlyString(this.props.selectedValue)}
                    percentage={((this.props.selectedValue / this.props.selectedTotal) *
                        100).toFixed(1)}
                    description={this.props.selectedDesc} />
                <BudgetSubfunctionsMap
                    topFunction={this.props.selected}
                    subfunctions={this.props.subfunctions}
                    colors={this.props.colors}
                    showSub={this.props.showSub}
                    tooltipStyles={this.props.tooltipStyles}
                    chosen={this.props.selected}
                    formatFriendlyString={this.props.formatFriendlyString} />
            </div>
        );
    }

}
BudgetSubfunctions.propTypes = propTypes;

