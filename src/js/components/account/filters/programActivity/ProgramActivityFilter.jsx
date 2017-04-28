/**
 * ProgramActivityFilter.jsx
 * Created by michaelbray on 4/14/17.
 */

import React from 'react';
import { OrderedSet } from 'immutable';
import _ from 'lodash';

import * as Icons from 'components/sharedComponents/icons/Icons';
import ProgramActivityItem from './ProgramActivityItem';

const propTypes = {
    selectedProgramActivities: React.PropTypes.instanceOf(OrderedSet),
    availableProgramActivities: React.PropTypes.array,
    updateFilter: React.PropTypes.func,
    noResults: React.PropTypes.bool,
    inFlight: React.PropTypes.bool
};

const defaultShown = 10;

const defaultState = {
    shown: defaultShown,
    shownType: 'more'
};

export default class ProgramActivityFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = defaultState;

        this.toggleValue = this.toggleValue.bind(this);
        this.toggleShownAmount = this.toggleShownAmount.bind(this);
    }

    toggleShownAmount() {
        const programActivities = this.props.availableProgramActivities;

        let updatedState = defaultState;

        if (this.state.shownType === 'more') {
            updatedState = {
                shown: Object.keys(programActivities).length,
                shownType: 'fewer'
            };
        }

        this.setState(updatedState);
    }

    toggleValue(event) {
        this.props.updateFilter(event.target.value);
    }

    generateProgramActivityItems(programActivities) {
        const activities = [];

        // Sort program activities by code, ascending, for display purposes
        // Code is a string - must convert to numeric before sorting
        const sortedProgramActivities =
            _.sortBy(programActivities, [(pa) => parseInt(pa.code, 10)]);

        sortedProgramActivities.forEach((programActivity) => {
            if (activities.length < this.state.shown) {
                const label = `${programActivity.code} - ${programActivity.name}`;
                const checked = this.props.selectedProgramActivities.includes(programActivity.id);

                if (activities.length <= this.state.shown
                    && (programActivity.name !== null && programActivity.name !== '')) {
                    activities.push(
                        <ProgramActivityItem
                            key={programActivity.id}
                            programActivityID={programActivity.id}
                            label={label}
                            checked={checked}
                            toggleValue={this.toggleValue} />);
                }
            }
        });

        if (activities.length === 0 && this.props.noResults) {
            activities.push("There are no Program Activities for this Federal Account.");
        }

        return activities;
    }

    generateToggleButton() {
        const programActivities = this.props.availableProgramActivities;
        let toggleButton = null;

        if (programActivities && Object.keys(programActivities).length > 10) {
            const remaining = Object.keys(programActivities).length - this.state.shown;
            let shownStatement = `${remaining} ${this.state.shownType}`;
            let arrow = (<Icons.AngleDown alt={`See ${shownStatement}`} />);

            if (remaining === 0) {
                shownStatement = this.state.shownType;
                arrow = (<Icons.AngleUp alt={`See ${shownStatement}`} />);
            }

            toggleButton = (<button
                className="see-more account-program-activity-toggle-button"
                onClick={this.toggleShownAmount}
                title={`See ${shownStatement}`}>
                See {shownStatement}
                &nbsp; {arrow}
            </button>);
        }

        return toggleButton;
    }

    render() {
        let items = this.generateProgramActivityItems(this.props.availableProgramActivities);
        const toggleButton = this.generateToggleButton();

        if (this.props.inFlight) {
            items = (<div className="account-program-activity-loading">
                Loading data...
            </div>);
        }

        return (
            <div className="account-program-activity-filter search-filter">
                <ul className="program-activities">
                    { items }
                </ul>
                {toggleButton}
            </div>
        );
    }
}

ProgramActivityFilter.propTypes = propTypes;
