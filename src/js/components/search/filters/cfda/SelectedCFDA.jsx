/**
 * SelectedCFDA.jsx
 * Created by Emily Gullo 07/10/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';

import * as OtherFiltersFormatter from 'helpers/otherFiltersFormatter';
import ShownCFDA from './ShownCFDA';

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
            const value = (<ShownCFDA
                cfda={cfda}
                label={OtherFiltersFormatter.formatCFDA(key, cfda)}
                key={key}
                removeCFDA={this.props.removeCFDA.bind(null, entry[1])} />);
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
