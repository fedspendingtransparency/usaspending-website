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
            const key = entry[0];
            const psc = entry[1];
            const value = (<ShownPSC
                psc={psc}
                label={OtherFiltersFormatter.formatPSC(key, psc)}
                key={key}
                removePSC={this.props.removePSC.bind(null, psc)} />);
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
