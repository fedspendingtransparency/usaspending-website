/**
 * TreeMap.jsx
 * Created by Emily Gullo 03/15/2017
 **/

import React from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import * as Icons from 'components/sharedComponents/icons/Icons';

import TreeMapCell from './TreeMapCell';
import TreeMapTooltip from './TreeMapTooltip';
import SubTreeMap from './SubTreeMap';

const propTypes = {
    categories: React.PropTypes.object,
    descriptions: React.PropTypes.array,
    colors: React.PropTypes.array,
    subfunctions: React.PropTypes.object,
    alternateColors: React.PropTypes.array
};

export default class TreeMap extends React.Component {

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
            showOverlay: true,
            selected: '',
            showSub: false
        };

        this.handleWindowResize = _.throttle(this.handleWindowResize.bind(this), 50);
        this.buildTree = this.buildTree.bind(this);
        this.toggleTooltip = this.toggleTooltip.bind(this);
        this.toggleSubfunction = this.toggleSubfunction.bind(this);
        this.formatFriendlyString = this.formatFriendlyString.bind(this);
        this.swapTiles = this.swapTiles.bind(this);
        this.showArrows = this.showArrows.bind(this);
        this.toggleOverlay = this.toggleOverlay.bind(this);
    }

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.categories.children.length > 0) {
            this.buildTree(nextProps.categories, nextProps.colors, null, this.state.showSub);
        }
        if (nextProps.descriptions !== this.state.descriptions) {
            this.setState({
                descriptions: nextProps.descriptions
            });
        }
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
                visualizationWidth: this.sectionWrapper.offsetWidth
            });
            let colors = this.props.colors;
            if (this.state.showSub) {
                colors = this.props.alternateColors;
            }
            if (this.props.categories.children.length > 0) {
                this.buildTree(this.props.categories, colors, null, this.state.showSub);
            }
        }
    }

    buildTree(cats, colors, chosen, sub) {
        // put the data through d3's hierarchy system to sum and sort it
        const root = d3.hierarchy(cats)
        .sum((d) => (d.value))
        .sort((a, b) => b.height - a.height || b.value - a.value);

        // set up a treemap object and pass in the root
        let tileStyle = d3.treemapBinary;
        let mapHeight = 565;
        let mapWidth = this.state.visualizationWidth;
        if (this.state.windowWidth < 768) {
            tileStyle = d3.treemapSlice;
        }
        if (sub === true) {
            tileStyle = d3.treemapDice;
            mapHeight = 25;
            mapWidth = this.state.visualizationWidth * 0.96;
        }
        this.setState({
            visualizationHeight: mapHeight
        });
        const treemap = d3.treemap()
            .round(true)
            .tile(tileStyle)
            .size([mapWidth, mapHeight])(root).leaves();

        // build the tiles
        const nodes = treemap.map((n, i) =>
            <TreeMapCell
                label={n.data.name}
                value={n.value}
                x0={n.x0}
                x1={n.x1}
                y0={n.y0}
                y1={n.y1}
                total={n.parent.value}
                key={i}
                color={colors[i]}
                chosenColor={this.props.colors[i]}
                chosen={chosen}
                toggleTooltip={this.toggleTooltip}
                showOverlay={this.state.showOverlay}
                toggleSubfunction={this.toggleSubfunction}
                clickable />
        );
        this.setState({
            finalNodes: nodes
        });
    }

    toggleTooltip(set) {
        const descSet = this.props.descriptions;
        // find index of object item on matching cat name
        let descIndex = '0';
        if (set.cat !== 'none') {
            descIndex = _.findIndex(descSet, { name: set.cat });
        }

        // set it to desc value
        let desc = '';
        if (set.cat !== 'none') {
            desc = descSet[descIndex].value;
        }

        // set the state
        this.setState({
            category: set.cat,
            description: desc,
            individualValue: set.value,
            x: set.xStart,
            y: set.yStart,
            width: set.width,
            height: set.height,
            total: set.total
        });
        if (this.state.showOverlay !== false) {
            this.toggleOverlay();
        }
    }

    toggleOverlay() {
        console.log("hi");
        this.setState({
            showOverlay: false
        });

        this.buildTree(this.props.categories, this.props.colors, this.state.category, false);
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

    toggleSubfunction(selected, selectedValue, selectedTotal, next, prev) {
        // resize main treemap
        const descSet = this.props.descriptions;
        let newSelected = selected;
        let newValue = selectedValue;
        // find index of object item on matching cat name
        let descIndex = '0';
        if (selected !== 'none') {
            descIndex = _.findIndex(descSet, { name: selected });
        }
        if ((next && descIndex < 16) || (prev && descIndex > 0)) {
            if (next) {
                descIndex += 1;
                newSelected = descSet[descIndex].name;
            }
            if (prev) {
                descIndex -= 1;
                newSelected = descSet[descIndex].name;
            }
            newValue = this.props.categories.children[descIndex].value;
        }

        // set values to state
        this.setState({
            selected: newSelected,
            selectedDesc: descSet[descIndex].value,
            selectedValue: newValue,
            selectedTotal,
            showSub: true
        });

        this.buildTree(this.props.categories, this.props.alternateColors, newSelected, true);
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
        if (direction === 'back') {
            this.setState({
                showSub: false
            });
            this.buildTree(this.props.categories, this.props.colors, null, false);
        }

        if (direction === 'left') {
            this.toggleSubfunction(
                this.state.selected,
                this.state.selectedValue,
                this.state.selectedTotal,
                false,
                true);
        }

        if (direction === 'right') {
            this.toggleSubfunction(
                this.state.selected,
                this.state.selectedValue,
                this.state.selectedTotal,
                true,
                false);
        }
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

    render() {
        let subFunctionTree = null;
        let functionDesc = null;
        let treeMapClass = '';
        let buttonBack = null;
        let buttonLeft = null;
        let buttonRight = null;
        if (this.state.showSub === true) {
            subFunctionTree = (
                <SubTreeMap
                    topFunction={this.state.selected}
                    subfunctions={this.props.subfunctions}
                    colors={this.props.colors} />);
            functionDesc = (
                <div className="function-desc">
                    <h1>{this.state.selected}</h1>
                    <h6>{this.formatFriendlyString(this.state.selectedValue)} |&nbsp;
                        {((this.state.selectedValue / this.state.selectedTotal) *
                            100).toFixed(1)}%</h6>
                    <p>{this.state.selectedDesc}</p>
                </div>);
            treeMapClass = 'minimized';
            buttonBack =
                (<button
                    className="back"
                    onClick={() => {
                        this.swapTiles('back');
                    }}>
                    {this.showArrows()[2]}
                </button>);
            buttonLeft =
                (<button
                    className="left"
                    onClick={() => {
                        this.swapTiles('left');
                    }}>
                    {this.showArrows()[0]}
                </button>);
            buttonRight =
                (<button
                    className="right"
                    onClick={() => {
                        this.swapTiles('right');
                    }}>
                    {this.showArrows()[1]}
                </button>);
        }
        return (
            <div
                className="usa-da-treemap-section">
                <div className="tree-desc">
                    <b>3</b> of the <b>19</b> total budget functions, accounted for about
                    &nbsp;<b>1/2</b> of total spending. <br />
                    <span className="highlight">Social Security</span>,&nbsp;
                    <span className="highlight">National Defense</span>,
                    and <span className="highlight">Medicare</span>.
                </div>
                <div className="treemap-inner-wrap">
                    { this.createTooltip() }
                    <div
                        className="tree-wrapper"
                        ref={(sr) => {
                            this.sectionWrapper = sr;
                        }}>
                        {buttonBack}
                        {buttonLeft}
                        <svg
                            width={this.state.visualizationWidth}
                            height={this.state.visualizationHeight}
                            className={treeMapClass}>
                            { this.state.finalNodes }
                        </svg>
                        {buttonRight}
                        {functionDesc}
                        { subFunctionTree }
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
                </div>
            </div>
        );
    }

}
TreeMap.propTypes = propTypes;
