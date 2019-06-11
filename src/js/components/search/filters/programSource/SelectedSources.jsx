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
        const shownSource = [];

        this.props.selectedSources.entrySeq().forEach((entry) => {
            const source = entry[1].code;
            const sourceDescription = entry[1].name;

            const value = (<ShownValue
                label={`${source} - ${sourceDescription}`}
                key={source}
                removeValue={this.props.removeSource.bind(null, entry[1])} />);
            shownSource.push(value);
        });

        return (
            <div
                className="selected-filters"
                role="status">
                {shownSource}
            </div>
        );
    }
}

SelectedSources.propTypes = propTypes;
