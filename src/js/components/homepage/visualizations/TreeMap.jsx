/**
 * TreeMap.jsx
 * Created by Emily Gullo 03/15/2017
 **/

import React from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

import TreeMapCell from './TreeMapCell';
import * as Icons from '../../sharedComponents/icons/Icons';

const propTypes = {
    categories: React.PropTypes.object,
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
            finalNodes: ''
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
            this.buildTree(nextProps.categories, nextProps.colors);
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
        }
    }

    buildTree(cats, colors) {
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
                toggleTooltip={this.toggleTooltip}
                color={colors[i]} />
        );

        this.setState({
            finalNodes: nodes
        });
    }

    toggleTooltip(cat, desc) {
        // toggle to original info if rolling off
        if (this.state.category !== 'none') {
            this.setState({
                category: 'none',
                description: ''
            });
        }
        // otherwise set the state
        this.setState({
            category: cat,
            description: desc
        });
    }

    render() {
        let sidebarContent = '';
        if (this.state.category === 'none') {
            sidebarContent = (
                <div className="treemap-sidebar">
                    <div className="tree-desc">
                        <b>3</b> of the <b>19</b> total budget functions, accounted for about
                        &nbsp;<b>1/2</b> of total spending. Social Security, National Defense,
                        and Medicare.
                    </div>
                    <div className="tree-hover-tip">
                        Hover over each block to learn more about Spending by Budget Function in
                        2016.
                    </div>
                </div>
            );
        }
        // else {
        //     sidebarContent = (<TreeMapSidebar
        //         category={this.state.category}
        //         description={this.this.state.description} />)
        //     }
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
