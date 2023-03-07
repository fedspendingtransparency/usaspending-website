/**
 * KeywordFilterGroup.jsx
 * Created by Emily Gullo 03/09/2017
 */

import React from 'react';
import PropTypes from 'prop-types';

import BaseTopFilterGroup from './BaseTopFilterGroup';

const propTypes = {
    filter: PropTypes.object,
    redux: PropTypes.object,
    compressed: PropTypes.bool
};

export default class KeywordFilterGroup extends React.Component {
    constructor(props) {
        super(props);

        this.removeFilter = this.removeFilter.bind(this);
        this.clearGroup = this.clearGroup.bind(this);
    }

    removeFilter(value) {
    // remove a single filter item
        const newValue = this.props.redux.reduxFilters.keyword.delete(value);
        this.props.redux.updateGenericFilter({
            type: 'keyword',
            value: newValue
        });
    }

    clearGroup() {
        this.props.redux.clearFilterType('keyword');
    }

    generateTags() {
    // check to see if a keyword is provided
        const tags = [];

        const keywords = this.props.filter.values;

        keywords.forEach((value) => {
            const tag = {
                value: `${value}`,
                title: `${value}`,
                removeFilter: this.removeFilter
            };

            tags.push(tag);
        });

        return tags;
    }

    render() {
        const tags = this.generateTags();

        return (<BaseTopFilterGroup
            tags={tags}
            filter={this.props.filter}
            clearFilterGroup={this.clearGroup}
            compressed={this.props.compressed} />);
    }
}

KeywordFilterGroup.propTypes = propTypes;
