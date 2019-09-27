/**
 * SelectedKeywords.jsx
 * Created by David Trinh on 5/2/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import ShownValue from 'components/search/filters/otherFilters/ShownValue';

const propTypes = {
    toggleKeyword: PropTypes.func,
    selectedKeywords: PropTypes.array
};

export default class SelectedKeywords extends React.Component {
    render() {
        let hideTags = 'hide';
        if (this.props.selectedKeywords.length !== 0) {
            hideTags = '';
        }
        const shownKeywords = this.props.selectedKeywords.map((keyword) => (
            <ShownValue
                label={keyword}
                key={keyword}
                removeValue={this.props.toggleKeyword.bind(null, keyword)} />
        ));

        return (
            <div
                className={`selected-filters ${hideTags}`}
                id="selected-keyword-tags"
                role="status">
                {shownKeywords}
            </div>
        );
    }
}

SelectedKeywords.propTypes = propTypes;
