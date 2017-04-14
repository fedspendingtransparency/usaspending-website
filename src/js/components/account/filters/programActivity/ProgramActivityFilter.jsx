/**
 * ProgramActivityFilter.jsx
 * Created by michaelbray on 4/14/17.
 */

import React from 'react';
import { OrderedSet } from 'immutable';


import ProgramActivityItem from './ProgramActivityItem';

const propTypes = {
    selectedProgramActivities: React.PropTypes.instanceOf(OrderedSet),
    programActivities: React.PropTypes.array,
    updateFilter: React.PropTypes.func,
    shown: React.PropTypes.number
};

export default class ProgramActivityFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            shown: 10,
            shownType: 'more'
        };

        this.toggleValue = this.toggleValue.bind(this);
    }

    generateShownStatement() {
        const remaining = Object.keys(this.props.programActivities).length - this.state.shown;

        if (remaining === 0) {
            return `See ${this.state.shownType}`;
        }

        return `See ${remaining} ${this.state.shownType}`;
    }

    toggleShownAmount(showType) {
        if (showType === 'more') {
            this.setState({
                shown: Object.keys(this.state.programActivities).length,
                shownType: 'fewer'
            });
        }
    }

    toggleValue(event) {
        const code = event.target.value;
        this.props.updateFilter(code);
    }

    render() {
        let itemCounter = 0;
        const items = [];

        this.props.programActivities.forEach((programActivity) => {
            if (itemCounter < this.state.shown) {
                const label = programActivity.name;
                const checked = this.props.programActivities.includes(programActivity.code);
                itemCounter += 1;

                items.push(
                    <ProgramActivityItem
                        key={programActivity.code}
                        code={programActivity.code}
                        label={label}
                        checked={checked}
                        toggleValue={this.toggleValue} />);
            }
        });

        return (
            <div className="account-program-activity-filter search-filter">
                <ul className="program-activities">
                    { items }
                </ul>
                <div>{this.generateShownStatement}</div>
            </div>
        );
    }
}

ProgramActivityFilter.propTypes = propTypes;
