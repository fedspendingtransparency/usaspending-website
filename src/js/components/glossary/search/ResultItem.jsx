/**
 * ResultItem.jsx
 * Created by Kevin Li 5/1/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    item: PropTypes.object,
    search: PropTypes.string,
    selectTerm: PropTypes.func
};

export default class ResultItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            label: null
        };

        this.clickedLink = this.clickedLink.bind(this);
    }

    componentDidMount() {
        this.prepareLabel(this.props);
    }

    componentDidUpdate() {
        this.prepareLabel(this.props);
    }

    prepareLabel(props) {
        const value = props.item.term.toLowerCase();
        let label = null;
        if (!props.search || value.indexOf(props.search.toLowerCase()) === -1) {
            // nothing is being searched (or there are no matches), so nothing needs to be
            // highlighted
            label = props.item.term;
        }

        else {
            // there is a search value, so we need to highlight the matched parts
            const search = props.search.toLowerCase();

            // split the string up into parts based on the search term
            const parts = value.split(search);

            let position = 0;
            const output = [];
            parts.forEach((part, index) => {
                const unmatchedPos = position + part.length;
                if (part.length > 0) {
                    // add the unmatched parts of the label
                    const unmatched = props.item.term.substring(position, unmatchedPos);
                    output.push(
                        <span key={`unmatched-${index}`}>
                            {unmatched}
                        </span>
                    );
                }

                if (index < parts.length - 1) {
                    // add the matched parts of the label
                    const matchedPos = unmatchedPos + search.length;
                    const matchedValue = props.item.term.substring(unmatchedPos, matchedPos);
                    const matched = (
                        <span className="matched-highlight" key={`match-${index}`}>
                            {matchedValue}
                        </span>
                    );
                    output.push(matched);
                }

                position = unmatchedPos + search.length;
            });

            label = output;
        }

        this.setState({
            label
        });
    }

    clickedLink() {
        this.props.selectTerm(this.props.item);
    }

    render() {
        return (
            <li>
                <button
                    className="glossary-link"
                    onClick={this.clickedLink}>
                    {this.state.label}
                </button>
            </li>
        );
    }
}

ResultItem.propTypes = propTypes;
