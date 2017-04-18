/**
 * CategoryMap.jsx
 * Created by Emily Gullo 03/15/2017
 **/

import React from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import * as Icons from 'components/sharedComponents/icons/Icons';

import CategoryMapCell from './CategoryMapCell';

const propTypes = {
    breakdown: React.PropTypes.object,
    colors: React.PropTypes.array
};

export default class CategoryMap extends React.Component {

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
        if (nextProps.breakdown.children.length > 0) {
            this.buildTree(nextProps.breakdown, nextProps.colors, '');
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
            if (this.props.breakdown !== null) {
                this.buildTree(this.props.breakdown, this.props.colors, '');
            }
        }
    }

    buildTree(cats, colors, chosen) {
        // put the data through d3's hierarchy system to sum and sort it
        const root = d3.hierarchy(cats)
        .sum((d) => (d.value))
        .sort((a, b) => b.height - a.height || b.value - a.value);

        // set up a treemap object and pass in the root
        let tileStyle = d3.treemapDice;
        if (this.state.windowWidth < 768) {
            tileStyle = d3.treemapSlice;
        }
        const treemap = d3.treemap()
            .round(true)
            .tile(tileStyle)
            .size([this.state.visualizationWidth, 140])(root).leaves();

        // build the tiles
        const nodes = treemap.map((n, i) => {
            let cell = '';
            if (n.value !== 0) {
                cell = (<CategoryMapCell
                    label={n.data.name}
                    value={n.data.value}
                    x0={n.x0}
                    x1={n.x1}
                    y0={n.y0}
                    y1={n.y1}
                    total={n.parent.value}
                    key={i}
                    color={colors[i]}
                    chosen={chosen}
                    toggleTooltip={this.toggleTooltip}
                    showOverlay={this.state.showOverlay} />);
            }
            return cell;
        });

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

        this.buildTree(this.props.breakdown, this.props.colors, this.state.category);
    }

    render() {
        return (<div className="by-category-section-wrap">
            <div className="inner-wrap">
                <h3>About <strong>3/4</strong> of the total spending was awarded to state and
                    local governments, private contractors, individuals, and others.</h3>
                <div className="by-category-vis">
                    <div
                        className="tree-wrapper"
                        ref={(sr) => {
                            this.sectionWrapper = sr;
                        }}>
                        <svg
                            width={this.state.visualizationWidth}
                            height="140">
                            { this.state.finalNodes }
                        </svg>
                    </div>
                </div>
                <div className="map-segue">
                    <div className="icon-wrap">
                        <Icons.MapMarker className="usa-da-map-marker" />
                    </div>
                    <h4>The geographic breakdown of this portion of the budget is shown on the
                        map below</h4>
                </div>
            </div>
        </div>
        );
    }

}
CategoryMap.propTypes = propTypes;
