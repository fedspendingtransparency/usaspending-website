/**
 * ExplorerVisualization.jsx
 * Created by Kevin Li 8/17/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { InfoCircle } from 'components/sharedComponents/icons/Icons';

import BreakdownDropdown from './toolbar/BreakdownDropdown';
import ExplorerTreemap from './treemap/ExplorerTreemap';

const propTypes = {
    root: PropTypes.string,
    active: PropTypes.object
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
        return (
            <div className="explorer-visualization-wrapper">
                <div className="toolbar">
                    <BreakdownDropdown
                        root={this.props.root}
                        active={this.props.active} />
                    <div className="instructions">
                        <div className="icon">
                            <InfoCircle />
                        </div>
                        <div className="label">
                            View Instructions
                        </div>
                    </div>
                </div>

                <div
                    className="treemap-width-reference"
                    ref={(div) => {
                        this.widthRef = div;
                    }} />

                <ExplorerTreemap
                    width={this.state.width}
                    data={this.props.data}
                    total={this.props.total} />

            </div>
        );
    }
}

ExplorerVisualization.propTypes = propTypes;
