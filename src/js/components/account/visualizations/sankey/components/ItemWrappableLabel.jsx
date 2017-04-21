/**
 * ItemLabel.jsx
 * Created by Kevin Li 3/28/17
 */

import React from 'react';
import { max } from 'lodash';
// import {}

const propTypes = {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    hide: React.PropTypes.bool,
    title: React.PropTypes.string,
    value: React.PropTypes.string
};

const defaultProps = {
    x: 0,
    y: 0,
    maxWidth: 0,
    hide: false
};

export default class ItemLabel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: []
        };
    }

    componentDidMount() {
        this.prepareLabel(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.prepareLabel(nextProps);
    }

    prepareLabel(props) {
        // break the title text out by words, each its own tspan element
        const words = props.title.split(' ');
        const tspans = words.map((word, index) => {
            let space = null;
            if (index + 1 < words.length) {
                space = ' ';
            }
            return <tspan key={index}>{word}{space}</tspan>;
        });

        this.setState({
            title: tspans
        }, () => {
            this.wrapLabel();
        });
    }

    wrapLabel() {
        // measure the width of the label
        const titleWidth = this.titleText.getComputedTextLength();
        const valueWidth = this.valueText.getComputedTextLength();

        const width = max([titleWidth, valueWidth]);

        if (width > this.props.maxWidth) {
            console.log(`WRAP ${this.props.title}`);
        }
    }

    render() {
        if (this.props.hide) {
            return null;
        }

        return (
            <g
                className="item-label"
                transform={`translate(${this.props.x},${this.props.y})`}>
                <text
                    className="title"
                    x={0}
                    y={0}
                    ref={(text) => {
                        this.titleText = text;
                    }}>
                    {this.state.title}
                </text>
                <text
                    className="value"
                    x={0}
                    y={16}
                    ref={(text) => {
                        this.valueText = text;
                    }}>
                    {this.props.value}
                </text>
            </g>
        );
    }
}

ItemLabel.propTypes = propTypes;
ItemLabel.defaultProps = defaultProps;
