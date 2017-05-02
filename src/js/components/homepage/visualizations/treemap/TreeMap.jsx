/**
 * TreeMap.jsx
 * Created by Emily Gullo 03/15/2017
 **/

import React from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

import TreeMapCell from './TreeMapCell';
import TreeMapSidebar from './TreeMapSidebar';
import TreeMapTooltip from './TreeMapTooltip';
import * as Icons from '../../../sharedComponents/icons/Icons';

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

    toggleTooltip(cat, value, xStart, yStart, width, height) {
        const descSet = this.props.descriptions;
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
            x: xStart,
            y: yStart,
            width,
            height,
            showOverlay: false
        });

        this.buildTree(this.props.categories, this.props.colors, this.state.category);
    }

    createTooltip() {
        let tooltip = null;
        if (this.state.category !== 'none') {
            tooltip = (<TreeMapTooltip
                name={this.state.category}
                value={this.state.individualValue}
                description={this.state.description}
                x={this.state.x}
                y={this.state.y}
                width={this.state.width}
                height={(this.state.height / 2) + 50} />);
        }
        return tooltip;
    }

    render() {
        const contentIntro = (
            <div className="tree-desc">
                <b>3</b> of the <b>19</b> total budget functions, accounted for about
                &nbsp;<b>1/2</b> of total spending. <br />
                <span className="highlight">Social Security</span>,&nbsp;
                <span className="highlight">National Defense</span>,
                and <span className="highlight">Medicare</span>.
            </div>);
        return (
            <div
                className="usa-da-treemap-section">
                {contentIntro}
                <div className="treemap-inner-wrap">
                    { this.createTooltip() }
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
            </div>
        );
    }

}
TreeMap.propTypes = propTypes;
