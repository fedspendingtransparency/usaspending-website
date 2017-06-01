/**
 * BudgetCategoryOCSearch.jsx
 * Created by michaelbray on 3/20/17.
 */

import React from 'react';
import _ from 'lodash';
import { objectClassDefinitions } from 'dataMapping/search/budgetCategory';

import PrimaryCheckboxType from 'components/sharedComponents/checkbox/PrimaryCheckboxType';

const propTypes = {
    selectObjectClass: React.PropTypes.func,
    objectClasses: React.PropTypes.object
};

export default class BudgetCategoryOCSearch extends React.Component {
    render() {
        const objectClassItems = [];

        Object.keys(objectClassDefinitions).forEach((key) => {
            objectClassItems.push(
                <PrimaryCheckboxType
                    {...this.props}
                    key={key}
                    id={`award-${key}`}
                    types={objectClassDefinitions}
                    name={objectClassDefinitions[key]}
                    value={_.toString(parseInt(key, 10))}
                    filterType="Object Class"
                    toggleCheckboxType={this.props.selectObjectClass.bind(this)}
                    selectedCheckboxes={this.props.objectClasses}
                    enableAnalytics />);
        });

        return (
            <div className="pop-typeahead checkbox-type-filter ">
                <p className="object-class-label">Object Class</p>
                <ul className="object-classes checkbox-types">
                    {objectClassItems}
                </ul>
            </div>
        );
    }
}

BudgetCategoryOCSearch.propTypes = propTypes;
