/**
 * RecipientFilterGroup.jsx
 * Created by michaelbray on 2/23/17.
 */

import React from 'react';

import BaseTopFilterGroup from './BaseTopFilterGroup';

const propTypes = {
    filter: React.PropTypes.object,
    removeFilter: React.PropTypes.func
};

export default class RecipientFilterGroup extends React.Component {
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

        // check to see if an agency is provided
        const recipients = this.props.filter.values;

        recipients.forEach((value) => {
            const tag = {
                value: `${value.recipient_unique_id}`,
                title: value.recipient_name,
                isSpecial: false,
                removeFilter: this.removeFilter
            };

            tags.push(tag);
        });

        return tags;
    }

    render() {
        const tags = this.generateTags();

        return <BaseTopFilterGroup {...this.props} tags={tags} />;
    }
}

RecipientFilterGroup.propTypes = propTypes;
