/**
* BudgetSubfunctions.jsx
* Created by Emily Gullo 05/15/2017
**/

import React from 'react';
import PropTypes from 'prop-types';
import { find, remove, sumBy } from 'lodash';

import BudgetSubfunctionsNavigation from './BudgetSubfunctionsNavigation';
import BudgetSubfunctionsDescription from './BudgetSubfunctionsDescription';
import BudgetSubfunctionsMap from './BudgetSubfunctionsMap';

const propTypes = {
    alternateColors: PropTypes.array,
    categories: PropTypes.object,
    colors: PropTypes.array,
    descriptions: PropTypes.array,
    selected: PropTypes.number,
    subfunctions: PropTypes.object,
    toggleSubfunction: PropTypes.func,
    changeActiveSubfunction: PropTypes.func,
    tooltipStyles: PropTypes.object,
    totalNumber: PropTypes.number,
    showSubfunctions: PropTypes.bool
};

export default class BudgetSubfunctions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            category: {},
            description: {},
            subfunction: {}
        };
    }

    componentWillMount() {
        this.updateSubfunctionState(this.props);
    }

    componentDidMount() {
        if (this.navigation && this.navigation.allButton) {
            this.navigation.allButton.focus();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selected !== this.props.selected) {
            this.updateSubfunctionState(nextProps);
        }
    }

    updateSubfunctionState(props) {
        const category = find(props.categories.children, { id: props.selected });
        const description = find(props.descriptions, { id: props.selected });
        const subfunction = props.subfunctions[category.name];

        this.setState({
            category,
            description,
            subfunction
        });
    }

    render() {
        let subfunctionTotal = 0;
        let numberOfSubfunctions = 0;

        // If a category is selected, sum the positive subfunction values
        if (this.state.category.value) {
            const positiveSubfunctions = this.state.subfunction;
            remove(positiveSubfunctions.children, (v) => v.value <= 0);

            // Count subfunctions
            numberOfSubfunctions = positiveSubfunctions.children.length;

            // Remove JS rounding issues
            subfunctionTotal = parseFloat(
                sumBy(positiveSubfunctions.children, 'value').toFixed(2)
            );
        }

        return (
            <div className="treemap-inner-wrap">
                <BudgetSubfunctionsNavigation
                    {...this.props}
                    {...this.state}
                    ref={(nav) => {
                        this.navigation = nav;
                    }} />
                <BudgetSubfunctionsDescription
                    {...this.props}
                    {...this.state}
                    subfunctionTotal={subfunctionTotal}
                    numberOfSubfunctions={numberOfSubfunctions} />
                <BudgetSubfunctionsMap
                    {...this.props}
                    {...this.state} />
            </div>
        );
    }

}

BudgetSubfunctions.propTypes = propTypes;
