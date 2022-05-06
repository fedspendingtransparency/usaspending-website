/**
 * ProgramActivityFilterGroup.jsx
 * Created by michaelbray on 4/17/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';

import LegacyBaseTopFilterGroup from './LegacyBaseTopFilterGroup';

const propTypes = {
    filter: PropTypes.object,
    redux: PropTypes.object
};

export default class ProgramActivityFilterGroup extends React.Component {
    constructor(props) {
        super(props);

        this.removeFilter = this.removeFilter.bind(this);
        this.clearGroup = this.clearGroup.bind(this);
    }

    removeFilter(value) {
    // remove a single filter item
        this.props.redux.toggleProgramActivity(value);
    }

    clearGroup() {
        this.props.redux.resetProgramActivity();
    }

    generateTags() {
        const tags = [];
        const selectedValues = this.props.filter.values;
        const availableProgramActivities = this.props.redux.filterOptions.programActivity;

        selectedValues.forEach((value) => {
            const programActivity = find(availableProgramActivities, { id: `${value}` });

            let label = value;
            if (programActivity) {
                label = programActivity.name;
            }

            const tag = {
                value,
                title: label,
                removeFilter: this.removeFilter
            };

            tags.push(tag);
        });

        return tags;
    }

    render() {
        const tags = this.generateTags();

        return (<LegacyBaseTopFilterGroup
            tags={tags}
            filter={this.props.filter}
            clearFilterGroup={this.clearGroup} />);
    }
}

ProgramActivityFilterGroup.propTypes = propTypes;
