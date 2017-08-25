/**
 * ExplorerVisualization.jsx
 * Created by Kevin Li 8/17/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import BreakdownDropdown from './toolbar/BreakdownDropdown';
import ExplorerTreemap from './treemap/ExplorerTreemap';

const propTypes = {
    isRoot: PropTypes.bool,
    isLoading: PropTypes.bool,
    root: PropTypes.string,
    active: PropTypes.object,
    data: PropTypes.object,
    total: PropTypes.number,
    goDeeper: PropTypes.func,
    changeSubdivisionType: PropTypes.func
};

export default class ExplorerVisualization extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 0
        };

        this.measureWidth = this.measureWidth.bind(this);
    }

    componentDidMount() {
        this.measureWidth();
        window.addEventListener('resize', this.measureWidth);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.measureWidth);
    }

    measureWidth() {
        const width = this.widthRef.offsetWidth;

        this.setState({
            width
        });
    }

    render() {
        let loadingClass = '';
        if (this.props.isLoading) {
            loadingClass = 'loading';
        }

        return (
            <div className="explorer-visualization-wrapper">
                <div className="toolbar">
                    <BreakdownDropdown
                        root={this.props.root}
                        active={this.props.active}
                        isRoot={this.props.isRoot}
                        changeSubdivisionType={this.props.changeSubdivisionType} />
                </div>

                <div
                    className="treemap-width-reference"
                    ref={(div) => {
                        this.widthRef = div;
                    }} />

                <div className={`treemap-loading-transition ${loadingClass}`}>
                    <ExplorerTreemap
                        width={this.state.width}
                        data={this.props.data}
                        total={this.props.total}
                        goDeeper={this.props.goDeeper} />
                </div>

                <div className="treemap-disclaimer">
                    All dollar amounts shown here represent obligated amounts
                </div>
            </div>
        );
    }
}

ExplorerVisualization.propTypes = propTypes;
