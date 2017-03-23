/**
 * TreeMap.jsx
 * Created by Emily Gullo 03/15/2017
 **/

import React from 'react';
import * as d3 from 'd3';

import Cell from './Cell';
import * as Icons from '../sharedComponents/icons/Icons';

const propTypes = {
    budgetCategories: React.PropTypes.object
};

export default class TreeMap extends React.Component {

    render() {
        // put the data through d3's hierarchy system to sum and sort it
        const root = d3.hierarchy(this.props.budgetCategories)
        .sum((d) => (d.value))
        .sort((a, b) => b.height - a.height || b.value - a.value);

        // set up a treemap object and pass in the root
        const treemap = d3.treemap()
            .round(true)
            .tile(d3.treemapBinary)
            .size([957, 565])(root).leaves();

        const colors = [
            '#1C4956',
            '#16646C',
            '#1C817B',
            '#28565A',
            '#28565A',
            '#2F625F',
            '#3C6D61',
            '#3C6D61',
            '#3C6D61',
            '#3C6D61',
            '#3C6D61',
            '#4C7861',
            '#4C7861',
            '#4C7861',
            '#4C7861',
            '#5F835F',
            '#5F835F'
        ];

        // build the tiles
        const finalNodes = treemap.map((n, i) =>
            <Cell
                label={n.data.name}
                value={n.value}
                x0={n.x0}
                x1={n.x1}
                y0={n.y0}
                y1={n.y1}
                total={n.parent.value}
                key={i}
                color={colors[i]} />
        );

        return (
            <div className="usa-da-treemap-section">
                <div className="treeMapInfoWrap">
                    <div className="tree-desc">
                        <b>3</b> of the <b>19</b> total budget functions, accounted for about &nbsp;
                        <b>1/2</b> of total spending. Social Security, National Defense, and Medicare.
                    </div>
                    <div className="tree-hover-tip">
                        Hover over each block to learn more about Spending by Budget Function in 2016.
                    </div>
                </div>
                <div className="treeMapWrap">
                    <svg style={{ margin: "0" }} width="957" height="565">
                        { finalNodes }
                    </svg>
                    <div className="source">
                        Source: White House Historical Tables
                        <div className="guide-icon">
                            <Icons.Guide />
                        </div>
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
