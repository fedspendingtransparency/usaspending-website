/**
 * SelectedSources.jsx
 * Created by Lizzie Salita 6/11/19
 **/

import React from 'react';
import PropTypes from 'prop-types';

import ShownValue from 'components/search/filters/otherFilters/ShownValue';

const propTypes = {
    selectedSources: PropTypes.object,
    removeSource: PropTypes.func,
    label: PropTypes.string
};

export default class SelectedSources extends React.Component {
    render() {
        const shownSources = this.props.selectedSources.entrySeq().map((entry) => {
            const identifier = entry[0];
            return (<ShownValue
                label={`${this.props.label} | ${identifier}`}
                key={identifier}
                removeValue={this.props.removeSource.bind(null, identifier)} />);
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
