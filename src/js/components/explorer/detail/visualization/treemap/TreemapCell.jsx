/**
 * TreemapCell.jsx
 * Created by Kevin Li 8/17/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
    color: PropTypes.string,
    title: PropTypes.object,
    subtitle: PropTypes.object,
    data: PropTypes.object,
    selectedCell: PropTypes.func,
    showTooltip: PropTypes.func,
    hideTooltip: PropTypes.func
};

const highlightColor = '#fdb81e';

export default class TreemapCell extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            backgroundColor: '',
            active: ''
        };

        this.clickedCell = this.clickedCell.bind(this);
        this.enteredCell = this.enteredCell.bind(this);
        this.exitedCell = this.exitedCell.bind(this);
    }

    componentWillMount() {
        this.setState({
            backgroundColor: this.props.color
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.color !== this.props.color) {
            this.setState({
                backgroundColor: nextProps.color
            });
        }
    }

    clickedCell() {
        this.exitedCell();
        this.props.selectedCell(this.props.data.id, this.props.data);
    }

    enteredCell() {
        const x = this.element.getBoundingClientRect().left + (this.props.width / 2);
        const y = this.element.getBoundingClientRect().top + (this.props.height / 2);

        const position = {
            x,
            y
        };

        this.props.showTooltip(position, Object.assign({}, this.props.data, {
            isAward: this.props.data.type === 'award'
        }));

        this.setState({
            backgroundColor: highlightColor,
            active: 'active'
        });
    }

    exitedCell() {
        this.props.hideTooltip();
        this.setState({
            backgroundColor: this.props.color,
            active: ''
        });
    }

    render() {
        const position = `translate(${this.props.x}, ${this.props.y})`;
        return (
            <g
                className="explorer-cell"
                transform={position}
                onClick={this.clickedCell}
                onMouseMove={this.enteredCell}
                onMouseLeave={this.exitedCell}
                ref={(g) => {
                    this.element = g;
                }}>
                <title>
                    {this.props.data.name}
                </title>
                <rect
                    className="explorer-cell-box"
                    x={0}
                    y={0}
                    width={this.props.width}
                    height={this.props.height}
                    style={{
                        fill: this.state.backgroundColor
                    }} />
                <text
                    className={`explorer-cell-title ${this.state.active}`}
                    textAnchor="middle"
                    x={this.props.title.x}
                    y={this.props.title.y}>
                    {this.props.title.text}
                </text>
                <text
                    className={`explorer-cell-value ${this.state.active}`}
                    textAnchor="middle"
                    x={this.props.subtitle.x}
                    y={this.props.subtitle.y}>
                    {this.props.subtitle.text}
                </text>
            </g>
        );
    }
}

TreemapCell.propTypes = propTypes;

