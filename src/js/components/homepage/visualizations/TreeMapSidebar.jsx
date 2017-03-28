/**
 * TreeMapSidebar.jsx
 * Created by Emily Gullo 03/28/2017
 **/

import React from 'react';

const propTypes = {
    category: React.PropTypes.string,
    description: React.PropTypes.string
};

export default class TreeMapSidebar extends React.Component {

    // componentWillReceiveProps(nextProps) {
    //
    // }

    render() {
        return (
            <div className="treemap-sidebar">
                <div className="tree-desc">
                    <h2>{this.props.category}</h2>
                    <p>{this.props.description}</p>
                </div>
            </div>
        );
    }

}
TreeMapSidebar.propTypes = propTypes;
