/**
 * SelectedSources.jsx
 * Created by Lizzie Salita 6/11/19
 **/

import React from 'react';
import PropTypes from 'prop-types';

import ShownValue from 'components/search/filters/otherFilters/ShownValue';

const propTypes = {
    selectedSources: PropTypes.object,
    removeSource: PropTypes.func
};

export default class SelectedSources extends React.Component {
    render() {
        const shownSources = [];

        this.props.selectedSources.entrySeq().forEach((entry) => {
            const source = entry[1].code.toUpperCase();
            const sourceDescription = entry[1].value;

            const value = (<ShownValue
                label={`${source} - ${sourceDescription}`}
                key={source}
                removeValue={this.props.removeSource.bind(null, entry[1].code, entry[1].value)} />);
            shownSources.push(value);
        });

        return (
            <div
                className="selected-filters"
                role="status">
                {shownSources}
            </div>
        );
    }
}

SelectedSources.propTypes = propTypes;
