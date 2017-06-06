/**
* BudgetSubfunctions.jsx
* Created by Emily Gullo 05/15/2017
**/

import React from 'react';
import _ from 'lodash';

import BudgetSubfunctionsNavigation from './BudgetSubfunctionsNavigation';
import BudgetSubfunctionsDescription from './BudgetSubfunctionsDescription';
import BudgetSubfunctionsMap from './BudgetSubfunctionsMap';

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
    showSubfunctions: React.PropTypes.bool
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.selected !== this.props.selected) {
            this.updateSubfunctionState(nextProps);
        }
    }

    updateSubfunctionState(props) {
        const category = _.find(props.categories.children, { id: props.selected });
        const description = _.find(props.descriptions, { id: props.selected });
        const subfunction = props.subfunctions[category.name];

        this.setState({
            category,
            description,
            subfunction
        });
    }

    render() {
        return (
            <div className="treemap-inner-wrap">
                <BudgetSubfunctionsNavigation
                    {...this.props}
                    {...this.state} />
                <BudgetSubfunctionsDescription
                    {...this.props}
                    {...this.state} />
                <BudgetSubfunctionsMap
                    {...this.props}
                    {...this.state} />
            </div>
        );
    }

}

BudgetSubfunctions.propTypes = propTypes;
