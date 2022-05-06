/**
 * SelectedCFDA.jsx
 * Created by Emily Gullo 07/10/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';

import * as OtherFiltersFormatter from 'helpers/otherFiltersFormatter';
import ShownValue from 'components/search/filters/otherFilters/ShownValue';

const propTypes = {
    selectedCFDA: PropTypes.object,
    removeCFDA: PropTypes.func
};

export default class SelectedCFDA extends React.Component {
    render() {
        const shownCFDA = [];
        this.props.selectedCFDA.entrySeq().forEach((entry) => {
            const key = entry[1].program_number;
            const cfda = entry[1].program_title;
            const value = (<ShownValue
                label={OtherFiltersFormatter.formatValue(key, cfda)}
                key={key}
                removeValue={this.props.removeCFDA.bind(null, entry[1])} />);
            shownCFDA.push(value);
        });

        return (
            <div
                className="selected-filters"
                role="status">
                {shownCFDA}
            </div>
        );
    }
}
SelectedCFDA.propTypes = propTypes;
