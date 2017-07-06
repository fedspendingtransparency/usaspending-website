/**
 * KeywordFilterGroup.jsx
 * Created by Emily Gullo 03/09/2017
 */

import React from 'react';
import PropTypes from 'prop-types';

import BaseTopFilterGroup from './BaseTopFilterGroup';

const propTypes = {
    filter: PropTypes.object,
    redux: PropTypes.object
};

export default class KeywordFilterGroup extends React.Component {
    constructor(props) {
        super(props);

        this.removeFilter = this.removeFilter.bind(this);
    }

    removeFilter() {
        // remove a single filter item
        this.props.redux.clearFilterType('keyword');
    }

    generateTags() {
        const tags = [];

        // check to see if a keyword is provided
        const keyword = this.props.filter.values;

        const tag = {
            value: keyword,
            title: `Keyword | ${keyword}`,
            isSpecial: false,
            removeFilter: this.removeFilter
        };

        tags.push(tag);

        return tags;
    }

    render() {
        const tags = this.generateTags();

        return (<BaseTopFilterGroup
            tags={tags}
            filter={this.props.filter}
            clearFilterGroup={this.removeFilter} />);
    }
}

KeywordFilterGroup.propTypes = propTypes;
