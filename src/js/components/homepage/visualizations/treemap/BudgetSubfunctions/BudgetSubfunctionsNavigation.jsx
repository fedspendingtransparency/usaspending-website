/**
 * BudgetSubfunctionsNavigation.jsx
 * Created by michaelbray on 5/30/17.
 */

import React from 'react';
import * as Icons from 'components/sharedComponents/icons/Icons';

import MinimizedBudgetFunctions from './MinimizedBudgetFunctions/MinimizedBudgetFunctions';
import MinimizedBudgetFunctionsTooltip from
    './MinimizedBudgetFunctions/MinimizedBudgetFunctionsTooltip';

const propTypes = {
    alternateColors: React.PropTypes.array,
    categories: React.PropTypes.object,
    changeActiveSubfunction: React.PropTypes.func,
    colors: React.PropTypes.array,
    descriptions: React.PropTypes.array,
    selected: React.PropTypes.number,
    toggleSubfunction: React.PropTypes.func,
    tooltipStyles: React.PropTypes.object,
    totalNumber: React.PropTypes.number
};

const arrows = {
    all: {
        direction: 0,
        label: "All Budget Functions"
    },
    previous: {
        direction: -1,
        label: "Previous Budget Function"
    },
    next: {
        direction: 1,
        label: "Next Budget Function"
    }
};

export default class BudgetSubfunctionsNavigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            label: null,
            width: 230,
            height: 44
        };

        this.showArrowTooltip = this.showArrowTooltip.bind(this);
        this.createArrowTooltip = this.createArrowTooltip.bind(this);
    }

    changeFunction(direction) {
        // 'direction' is -1 for previous, 0 for all (return), and 1 for next
        if (direction === 0) {
            this.props.toggleSubfunction();
        }
        else {
            const functionLength = this.props.categories.children.length;
            let newSelected = this.props.selected + direction;

            if (newSelected < 0) {
                newSelected = functionLength - 1;
            }
            else if (newSelected === functionLength) {
                newSelected = 0;
            }

            this.props.changeActiveSubfunction(newSelected);
        }
    }

    showArrowTooltip(arrow) {
        let el = null;
        let hideArrow = true;

        // X should be 0 for the Previous Button, so we set it
        // by default, as we don't need any calculations
        let x = 0;

        // All Button
        if (arrow.direction === 0) {
            el = this.allButton;

            // Align the tooltip with the arrow by
            // 1) Getting the left offset of the arrow
            // 2) Subtracting 40 pixels of padding on the outer wrapper
            // 3) Centering the tooltip by subtracting half its width
            // 4) Moving the tooltip over by half the width of the arrow
            x = el.offsetLeft - 40 - ((this.state.width - el.offsetWidth) / 2);
            hideArrow = false;
        }
        // Next Button
        else if (arrow.direction === 1) {
            el = this.nextButton;

            // Align the tooltip to the right side by
            // 1) Getting the left offset of the arrow
            // 2) Subtracting the width of the tooltip
            // 3) Subtracting the width of the arrow
            x = el.offsetLeft - this.state.width - el.offsetWidth;
        }

        this.setState({
            label: arrow.label,
            x,
            y: 9,
            hideArrow
        });
    }

    createArrowTooltip() {
        let tooltip = null;

        if (this.state.label !== null) {
            tooltip = (<MinimizedBudgetFunctionsTooltip
                name={this.state.label}
                x={this.state.x}
                y={this.state.y}
                width={this.state.width}
                height={this.state.height}
                hideArrow={this.state.hideArrow}
                arrow />);
        }

        return tooltip;
    }

    render() {
        let minimized = null;

        // Show the minimized version of the Budget Functions Treemap if there is
        // room to display it on larger screen sizes
        if (window.innerWidth > 768) {
            minimized = (<MinimizedBudgetFunctions
                {...this.props} />);
        }

        return (
            <div className="treemap-navigation-holder">
                { this.createArrowTooltip() }
                <div>
                    <button
                        className="back"
                        onClick={() => {
                            this.changeFunction(arrows.all.direction);
                        }}
                        onMouseEnter={() => {
                            this.showArrowTooltip(arrows.all);
                        }}
                        onMouseLeave={() => {
                            this.setState({ label: null });
                        }}
                        ref={(button) => {
                            this.allButton = button;
                        }}>
                        <Icons.AngleUp />
                    </button>
                </div>
                <div className="treemap-navigation-bar">
                    <button
                        className="left"
                        onClick={() => {
                            this.changeFunction(arrows.previous.direction);
                        }}
                        onMouseEnter={() => {
                            this.showArrowTooltip(arrows.previous);
                        }}
                        onMouseLeave={() => {
                            this.setState({ label: null });
                        }}
                        ref={(button) => {
                            this.previousButton = button;
                        }}>
                        <Icons.AngleLeft />
                    </button>
                    { minimized }
                    <button
                        className="right"
                        onClick={() => {
                            this.changeFunction(arrows.next.direction);
                        }}
                        onMouseEnter={() => {
                            this.showArrowTooltip(arrows.next);
                        }}
                        onMouseLeave={() => {
                            this.setState({ label: null });
                        }}
                        ref={(button) => {
                            this.nextButton = button;
                        }}>
                        <Icons.AngleRight />
                    </button>
                </div>
            </div>
        );
    }

}

BudgetSubfunctionsNavigation.propTypes = propTypes;
