/**
 * BudgetCategoryOCSearch.jsx
 * Created by michaelbray on 3/20/17.
 */

import React from 'react';
import { objectClassDefintions } from 'dataMapping/search/budgetCategory';

// import * as AwardAmountHelper from 'helpers/awardAmountHelper';
import ObjectClassItem from './ObjectClassItem';

const propTypes = {
    selectObjectClass: React.PropTypes.func,
    objectClassDefintions: React.PropTypes.object
};

const defaultProps = {
    objectClassDefintions
};

export default class BudgetCategoryOCSearch extends React.Component {
    render() {
        const objectClassItems = [];

        Object.keys(this.props.objectClassDefintions).forEach((key) => {
            objectClassItems.push(
                <ObjectClassItem
                    {...this.props}
                    objectClassLabel={this.props.objectClassDefintions[key]}
                    objectClassID={parseInt(key, 10)}
                    key={`award-${key}`}
                    toggleSelection={this.props.selectObjectClass.bind(this)} />);
        });

        return (
            <div className="">
                <ul className="object-classes">
                    {objectClassItems}
                </ul>
            </div>
        );
    }
}

BudgetCategoryOCSearch.propTypes = propTypes;
BudgetCategoryOCSearch.defaultProps = defaultProps;
