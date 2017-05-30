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
    colors: React.PropTypes.array,
    descriptions: React.PropTypes.array,
    selected: React.PropTypes.number,
    subfunctions: React.PropTypes.object,
    toggleSubfunction: React.PropTypes.func,
    changeActiveSubfunction: React.PropTypes.func,
    tooltipStyles: React.PropTypes.object,
    totalNumber: React.PropTypes.number,
    category: React.PropTypes.object,
    description: React.PropTypes.object
};

const defaultProps = {

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
            width: 200,
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
        let x = 0;
        let hideArrow = true;

        // All Button
        if (arrow.direction === 0) {
            el = this.allButton;
            x = el.offsetLeft - (this.state.width / 2) - el.offsetWidth - 7;
            hideArrow = false;
        }
        // Previous Button
        else if (arrow.direction === -1) {
            el = this.previousButton;
            x = 28;
        }
        // Next Button
        else {
            el = this.nextButton;
            x = el.offsetLeft - this.state.width - el.offsetWidth - 28;
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
            <div>
                { this.createArrowTooltip() }
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
                { minimized }
            </div>
        );
    }

}

BudgetSubfunctionsNavigation.propTypes = propTypes;
BudgetSubfunctionsNavigation.defaultProps = defaultProps;
