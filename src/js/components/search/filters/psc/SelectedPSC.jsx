/**
 * SelectedPSC.jsx
 * Created by Emily Gullo 07/14/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';

import ShownValue from 'components/search/filters/otherFilters/ShownValue';

const propTypes = {
    selectedPSC: PropTypes.object,
    removePSC: PropTypes.func
};

export default class SelectedPSC extends React.Component {
    render() {
        const shownPSC = [];

        this.props.selectedPSC.entrySeq().forEach((entry) => {
            const psc = entry[1].product_or_service_code;
            const pscDescription = entry[1].psc_description;

            const value = (<ShownValue
                label={`${psc} - ${pscDescription}`}
                key={psc}
                removeValue={this.props.removePSC.bind(null, entry[1])} />);
            shownPSC.push(value);
        });

        return (
            <div
                className="selected-filters"
                role="status">
                {shownPSC}
            </div>
        );
    }
}
SelectedPSC.propTypes = propTypes;
