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
    totalNumber: React.PropTypes.number
};

export default class BudgetSubfunctions extends React.Component {
    render() {
        const category = _.find(this.props.categories.children, { id: this.props.selected });
        const description = _.find(this.props.descriptions, { id: this.props.selected });
        const subfunction = this.props.subfunctions[category.name];

        return (
            <div className="treemap-inner-wrap">
                <BudgetSubfunctionsNavigation
                    {...this.props}
                    category={category}
                    description={description} />
                <BudgetSubfunctionsDescription
                    {...this.props}
                    category={category}
                    description={description} />
                <BudgetSubfunctionsMap
                    {...this.props}
                    category={category}
                    subfunction={subfunction}
                    description={description} />
            </div>
        );
    }

}

BudgetSubfunctions.propTypes = propTypes;
