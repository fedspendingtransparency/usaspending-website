/**
 * KeywordFilterGroup.jsx
 * Created by Emily Gullo 03/09/2017
 */

import React from 'react';

import BaseTopFilterGroup from './BaseTopFilterGroup';

const propTypes = {
    filter: React.PropTypes.object,
    removeFilter: React.PropTypes.func
};

export default class KeywordFilterGroup extends React.Component {
    constructor(props) {
        super(props);

        this.removeFilter = this.removeFilter.bind(this);
    }

    removeFilter(value) {
        // remove a single filter item
        this.props.removeFilter(this.props.filter.code, value);
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

        return <BaseTopFilterGroup {...this.props} tags={tags} />;
    }
}

KeywordFilterGroup.propTypes = propTypes;
