/**
 * ObjectClassFilter.jsx
 * Created by Kevin Li 3/30/17
 */

import React from 'react';
import { OrderedSet } from 'immutable';

import { objectClassDefinitions } from 'dataMapping/search/budgetCategory';

import PrimaryCheckboxType from 'components/sharedComponents/checkbox/PrimaryCheckboxType';

const propTypes = {
    selectedCodes: React.PropTypes.instanceOf(OrderedSet),
    updateFilter: React.PropTypes.func
};

export default class ObjectClassFilter extends React.Component {
    constructor(props) {
        super(props);

        this.toggleValue = this.toggleValue.bind(this);
    }

    toggleValue(code) {
        this.props.updateFilter(code);
    }

    render() {
        const items = Object.keys(objectClassDefinitions).map((code) => {
            const label = objectClassDefinitions[code];
            return (<PrimaryCheckboxType
                {...code}
                {...this.props}
                name={label}
                value={code}
                key={code}
                types={objectClassDefinitions}
                filterType="Object Class"
                selectedCheckboxes={this.props.selectedCodes}
                toggleCheckboxType={this.toggleValue}
                enableAnalytics />);
        });

        return (
            <div className="account-object-class-filter search-filter">
                <div className="checkbox-type-filter search-filter">
                    <ul className="object-classes checkbox-types">
                        { items }
                    </ul>
                </div>
            </div>
        );
    }
}

ObjectClassFilter.propTypes = propTypes;
