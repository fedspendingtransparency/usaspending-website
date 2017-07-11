/**
 * SelectedCFDA.jsx
 * Created by Emily Gullo 07/10/2017
 **/

import React from 'react';

import * as CFDAFormatter from 'helpers/cfdaFormatter';
import ShownCFDA from './ShownCFDA';

const propTypes = {
    selectedCFDA: React.PropTypes.object,
    removeCFDA: React.PropTypes.func
};

export default class SelectedCFDA extends React.Component {
    render() {
        const shownCFDA = [];
        this.props.selectedCFDA.entrySeq().forEach((entry) => {
            const key = entry[0];
            const cfda = entry[1];
            const value = (<ShownCFDA
                cfda={cfda}
                label={CFDAFormatter.formatCFDA(key, cfda)}
                key={key}
                removeCFDA={this.props.removeCFDA.bind(null, cfda)} />);
            shownCFDA.push(value);
        });

        return (
            <div className="selected-filters">
                {shownCFDA}
            </div>
        );
    }
}
SelectedCFDA.propTypes = propTypes;
