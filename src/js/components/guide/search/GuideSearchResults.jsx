/**
 * GuideSearchResults.jsx
 * Created by Kevin Li 5/1/17
 */

import React from 'react';
import _ from 'lodash';

import ResultGroup from './ResultGroup';

const propTypes = {
    guide: React.PropTypes.object
};

export default class GuideSearchResults extends React.Component {
    groupResults() {
        // we need to group the results by their starting letter
        const groups = {};

        this.props.guide.search.results.forEach((result) => {
            const startingLetter = result.value.charAt(0).toUpperCase();
            // check if we already have the character
            if (Object.hasOwnProperty.call(groups, startingLetter)) {
                // we do, add it to to the list
                const groupValues = _.concat([], groups[startingLetter].values, result);
                groups[startingLetter].values = _.sortBy(groupValues, ['value']);
            }
            else {
                // the character doesn't exist as a group item yet
                const group = {
                    letter: startingLetter,
                    values: [result]
                };
                groups[startingLetter] = group;
            }
        });

        // sort the groups by starting letter
        const orderedGroups = _.sortBy(groups, ['letter']);

        return orderedGroups.map((group) => (
            <ResultGroup
                key={group.letter}
                title={group.letter}
                items={group.values}
                search={this.props.guide.search.input} />
        ));
    }

    render() {
        const results = this.groupResults();
        return (
            <div className="guide-search-results">
                <h2 className="section-title">
                    Descriptions
                </h2>
                {results}
            </div>
        );
    }
}

GuideSearchResults.propTypes = propTypes;
