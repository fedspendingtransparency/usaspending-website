/**
 * BudgetCategoryOCSearch.jsx
 * Created by michaelbray on 3/20/17.
 */

import React from 'react';
import { objectClassDefinitions } from 'dataMapping/search/budgetCategory';

import ObjectClassItem from './ObjectClassItem';

const propTypes = {
    selectObjectClass: React.PropTypes.func
};

export default class BudgetCategoryOCSearch extends React.Component {
    render() {
        const objectClassItems = [];

        Object.keys(objectClassDefinitions).forEach((key) => {
            objectClassItems.push(
                <ObjectClassItem
                    {...this.props}
                    objectClassLabel={objectClassDefinitions[key]}
                    objectClassID={parseInt(key, 10)}
                    key={`award-${key}`}
                    toggleSelection={this.props.selectObjectClass.bind(this)} />);
        });

        return (
            <div className="pop-typeahead">
                <p className="object-class-label">Object Class</p>
                <ul className="object-classes">
                    {objectClassItems}
                </ul>
            </div>
        );
    }
}

BudgetCategoryOCSearch.propTypes = propTypes;
