/**
 * ObjectClassFilter.jsx
 * Created by Kevin Li 3/30/17
 */

import React from 'react';
import { OrderedSet } from 'immutable';

import { objectClassDefinitions } from 'dataMapping/search/budgetCategory';

import ObjectClassItem from './ObjectClassItem';

const propTypes = {
    selectedCodes: React.PropTypes.instanceOf(OrderedSet),
    updateFilter: React.PropTypes.func
};

export default class ObjectClassFilter extends React.Component {
    constructor(props) {
        super(props);

        this.toggleValue = this.toggleValue.bind(this);
    }

    toggleValue(event) {
        const code = event.target.value;
        this.props.updateFilter(code);
    }

    render() {
        const items = Object.keys(objectClassDefinitions).map((code) => {
            const label = objectClassDefinitions[code];
            const checked = this.props.selectedCodes.includes(code);
            return (<ObjectClassItem
                key={code}
                code={code}
                label={label}
                checked={checked}
                toggleValue={this.toggleValue} />);
        });

        return (
            <div className="account-object-class-filter search-filter">
                <ul className="object-classes">
                    { items }
                </ul>
            </div>
        );
    }
}

ObjectClassFilter.propTypes = propTypes;
