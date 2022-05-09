/**
 * TreemapCell.jsx
 * Created by Kevin Li 8/17/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { labelColorFromBackground } from 'helpers/colorHelper';

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
    hideTooltip: PropTypes.func,
    goToUnreported: PropTypes.func,
    highlightColor: PropTypes.string
};

const highlightColor = '#fdb81e';

export default class TreemapCell extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            backgroundColor: '',
            active: '',
            textColor: '#ffffff'
        };

        this.clickedCell = this.clickedCell.bind(this);
        this.enteredCell = this.enteredCell.bind(this);
        this.exitedCell = this.exitedCell.bind(this);
    }

    componentDidMount() {
        this.setTextAndBackgroundColor();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.color !== this.props.color) {
            this.setTextAndBackgroundColor();
        }
    }

    setTextAndBackgroundColor() {
        const textColor = labelColorFromBackground(this.props.color);
        this.setState({
            textColor,
            backgroundColor: this.props.color
        });
    }

    clickedCell() {
        if (this.props.data.id !== 'undefined' && this.props.data.id) {
            this.exitedCell();
            this.props.selectedCell(this.props.data.id, this.props.data);
        }
        else if (this.props.data.name === 'Unreported Data') {
            this.exitedCell();
            this.props.goToUnreported(this.props.data);
        }
    }

    enteredCell() {
        const x = this.element.getBoundingClientRect().left + (this.props.width / 2);
        const y = this.element.getBoundingClientRect().top + (this.props.height / 2);

        const position = {
            x,
            y
        };

        this.props.showTooltip(position, {
            ...this.props.data,
            isAward: this.props.data.type === 'award'
        });

        this.setState({
            backgroundColor: this.props.highlightColor || highlightColor,
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
        let cellTitle = (
            <text
                className={`explorer-cell-title ${this.state.active}`}
                textAnchor="middle"
                fill={this.state.textColor}
                x={this.props.title.x}
                y={this.props.title.y}>
                {this.props.title.text}
            </text>
        );

        let cellValue = (
            <text
                className={`explorer-cell-value ${this.state.active}`}
                textAnchor="middle"
                fill={this.state.textColor}
                x={this.props.subtitle.x}
                y={this.props.subtitle.y}>
                {this.props.subtitle.text}
            </text>
        );

        if (this.props.width < 75 || this.props.height < 38) {
            cellTitle = '';
            cellValue = '';
        }
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
                    {this.props.title.text}
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
                {cellTitle}
                {cellValue}
            </g>
        );
    }
}

TreemapCell.propTypes = propTypes;

