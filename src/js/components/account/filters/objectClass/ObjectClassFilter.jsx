/**
 * ObjectClassFilter.jsx
 * Created by Kevin Li 3/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { OrderedSet } from 'immutable';

import PrimaryCheckboxType from 'components/sharedComponents/checkbox/PrimaryCheckboxType';

const propTypes = {
    availableObjectClasses: PropTypes.array,
    selectedCodes: PropTypes.instanceOf(OrderedSet),
    updateFilter: PropTypes.func,
    updateMajorFilter: PropTypes.func
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
        const items = this.props.availableObjectClasses.map((major) => {
            const label = major.name;
            const id = `${major.id}`;
            const childFilters = [];
            const childValues = {};
            major.minor_object_class.forEach((minor) => {
                childFilters.push(`${minor.id}`);
                childValues[minor.id] = minor.name;
            });

            return (<PrimaryCheckboxType
                name={label}
                value={id}
                key={id}
                types={childValues}
                filters={childFilters}
                filterType="Major Object Class"
                selectedCheckboxes={this.props.selectedCodes}
                toggleCheckboxType={this.toggleValue}
                bulkTypeChange={this.props.updateMajorFilter} />);
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
