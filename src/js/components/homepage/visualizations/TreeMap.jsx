/**
 * TreeMap.jsx
 * Created by Emily Gullo 03/15/2017
 **/

import React from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

import TreeMapCell from './TreeMapCell';
import TreeMapSidebar from './TreeMapSidebar';
import * as Icons from '../../sharedComponents/icons/Icons';

const propTypes = {
    categories: React.PropTypes.object,
    descriptions: React.PropTypes.array,
    colors: React.PropTypes.array
};

export default class TreeMap extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            visualizationWidth: 0,
            category: 'none',
            description: '',
            descriptions: {},
            finalNodes: '',
            individualValue: '',
            showOverlay: true
        };

        this.handleWindowResize = _.throttle(this.handleWindowResize.bind(this), 50);
        this.buildTree = this.buildTree.bind(this);
        this.toggleTooltip = this.toggleTooltip.bind(this);
    }

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.categories.children.length > 0) {
            this.buildTree(nextProps.categories, nextProps.colors, '');
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
            if (this.props.categories.children.length > 0) {
                this.buildTree(this.props.categories, this.props.colors, '');
            }
        }
    }

    buildTree(cats, colors, chosen) {
        // put the data through d3's hierarchy system to sum and sort it
        const root = d3.hierarchy(cats)
        .sum((d) => (d.value))
        .sort((a, b) => b.height - a.height || b.value - a.value);

        // set up a treemap object and pass in the root
        let tileStyle = d3.treemapBinary;
        if (this.state.windowWidth < 768) {
            tileStyle = d3.treemapSlice;
        }
        const treemap = d3.treemap()
            .round(true)
            .tile(tileStyle)
            .size([this.state.visualizationWidth, 565])(root).leaves();

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
                chosen={chosen}
                toggleTooltip={this.toggleTooltip}
                showOverlay={this.state.showOverlay} />
        );

        this.setState({
            finalNodes: nodes
        });
    }

    toggleTooltip(cat, value) {
        const descSet = this.state.descriptions;
        // find index of object item on matching cat name
        let descIndex = '0';
        if (cat !== 'none') {
            descIndex = _.findIndex(descSet, { name: cat });
        }

        // set it to desc value
        let desc = '';
        if (cat !== 'none') {
            desc = descSet[descIndex].value;
        }

        // set the state
        this.setState({
            category: cat,
            description: desc,
            individualValue: value,
            showOverlay: false
        });

        this.buildTree(this.props.categories, this.props.colors, this.state.category);
    }

    render() {
        let sidebarContent = '';
        let sideBarIntro = '';
        if (this.state.showOverlay === true) {
            sideBarIntro = (
                <div className="tree-desc">
                    <b>3</b> of the <b>19</b> total budget functions, accounted for about
                    &nbsp;<b>1/2</b> of total spending. Social Security, National Defense,
                    and Medicare.
                </div>);
        }
        if (this.state.category === 'none') {
            sidebarContent = (
                <div className="treemap-sidebar">
                    { sideBarIntro }
                    <div className="tree-hover-tip">
                        Hover over each block to learn more about Spending by Budget Function in
                        2016.
                    </div>
                </div>
            );
        }
        else {
            sidebarContent = (<TreeMapSidebar
                category={this.state.category}
                description={this.state.description}
                amount={this.state.individualValue} />);
        }
        return (
            <div
                className="usa-da-treemap-section">
                { sidebarContent }
                <div
                    className="tree-wrapper"
                    ref={(sr) => {
                        this.sectionWrapper = sr;
                    }}>
                    <svg
                        width={this.state.visualizationWidth}
                        height="565">
                        <defs>
                            <linearGradient id="Gradient1">
                                <stop className="stop1" offset="0%" />
                                <stop className="stop2" offset="50%" />
                                <stop className="stop3" offset="100%" />
                            </linearGradient>
                            <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="red" />
                                <stop offset="50%" stopColor="black" stopOpacity="0" />
                                <stop offset="100%" stopColor="blue" />
                            </linearGradient>
                        </defs>
                        { this.state.finalNodes }
                    </svg>
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
        );
    }

}
TreeMap.propTypes = propTypes;
