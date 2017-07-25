/**
 * SelectedPSC.jsx
 * Created by Emily Gullo 07/14/2017
 **/

import React from 'react';

import * as OtherFiltersFormatter from 'helpers/otherFiltersFormatter';
import ShownPSC from './ShownPSC';

const propTypes = {
    selectedPSC: React.PropTypes.object,
    removePSC: React.PropTypes.func
};

export default class SelectedPSC extends React.Component {
    render() {
        const shownPSC = [];
        this.props.selectedPSC.entrySeq().forEach((entry) => {
            const psc = entry[1].product_or_service_code;
            const value = (<ShownPSC
                psc={psc}
                label={OtherFiltersFormatter.formatPSC(psc)}
                key={psc}
                removePSC={this.props.removePSC.bind(null, entry[1])} />);
            shownPSC.push(value);
        });

        return (
            <div className="selected-filters">
                {shownPSC}
            </div>
        );
    }
}
SelectedPSC.propTypes = propTypes;
