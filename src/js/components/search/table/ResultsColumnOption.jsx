/**
 * ResultsColumnOption.jsx
 * Created by Lizzie Salita 05/03/17
 **/

import React from 'react';

import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import ItemTypes from './ItemTypes';

const propTypes = {
    checked: React.PropTypes.string,
    column: React.PropTypes.string,
    label: React.PropTypes.string,
    toggleColumnVisibility: React.PropTypes.func,
    connectDragSource: React.PropTypes.func.isRequired,
    connectDropTarget: React.PropTypes.func.isRequired,
    index: React.PropTypes.number.isRequired,
    isDragging: React.PropTypes.bool.isRequired,
    id: React.PropTypes.any.isRequired,
    moveColumn: React.PropTypes.func.isRequired
};

const columnSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index
        };
    }
};

const columnTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        // Perform the action
        props.moveColumn(dragIndex, hoverIndex);

        // Mutating the monitor item here
        // for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    }
};

class ResultsColumnOption extends React.Component {
    constructor(props) {
        super(props);

        this.toggleColumnVisibility = this.toggleColumnVisibility.bind(this);
    }

    toggleColumnVisibility() {
        this.props.toggleColumnVisibility(this.props.column);
    }

    render() {
        const checked = this.props.checked;
        const { label, isDragging, connectDragSource, connectDropTarget } = this.props;
        const opacity = isDragging ? 0 : 1;

        return connectDragSource(connectDropTarget(
            <li style={{ opacity }}>
                <input
                    type="checkbox"
                    id={`column-${this.props.column}`}
                    value={this.props.label}
                    checked={checked}
                    onChange={this.toggleColumnVisibility} />
                <label htmlFor={`column-${this.props.column}`}>
                    {label}
                </label>
            </li>
        ));
    }
}

ResultsColumnOption.propTypes = propTypes;

export default flow(
    DragSource(ItemTypes.COLUMN, columnSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    })),
    DropTarget(ItemTypes.COLUMN, columnTarget, (connect) => ({
        connectDropTarget: connect.dropTarget()
    }))
)(ResultsColumnOption);
