/**
 * TreeMapLine
 * Created by michaelbray on 6/2/17.
 */

import React from 'react';
import _ from 'lodash';
import TreeMapLabel from './TreeMapLabel';

const propTypes = {
    rectTransform: React.PropTypes.string,
    textTransform: React.PropTypes.string,
    label: React.PropTypes.string
};

export default class TreeMapLine extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            visualizationWidth: 0
        };

        this.handleWindowResize = _.throttle(this.handleWindowResize.bind(this), 50);
    }

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    handleWindowResize() {
        // determine if the width changed
        const windowWidth = window.innerWidth;
        if (this.state.windowWidth !== windowWidth) {
            this.setState({
                windowWidth,
                visualizationWidth: this.gClass.offsetWidth
            }, () => {
                this.forceUpdate();
            });
        }
    }

    render() {
        return (<div
            className="line-wrap"
            ref={(g) => {
                this.gClass = g;
            }}>
            <svg
                className={`budget-line large`}>
                <g
                    className="budget-label-group"
                    transform="translate(0, 0)">
                    <TreeMapLabel
                        labelWidth={20}
                        labelPadding={5}
                        labelDistance={5}
                        currentX={0}
                        graphWidth={this.state.visualizationWidth}
                        size="large" />
                    <g
                        className="budget-label"
                        transform={`translate(${this.state.visualizationWidth / 2},0)rotate(0)`}>
                        <rect
                            transform={this.props.rectTransform}
                            fill="#ECECEC"
                            width="92"
                            height="30"
                            x={-45}
                            y={0} />
                        <text
                            transform={this.props.textTransform}
                            fill="#555555"
                            className="title"
                            x={0}
                            y={0}
                            textAnchor="end">
                            {this.props.label}
                        </text>
                    </g>
                </g>
            </svg>
        </div>);
    }
}

TreeMapLine.propTypes = propTypes;
