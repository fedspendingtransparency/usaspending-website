/**
 * ResultItem.jsx
 * Created by Kevin Li 5/1/17
 */

import React from 'react';

const propTypes = {
    value: React.PropTypes.string,
    search: React.PropTypes.string
};

export default class ResultItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            label: null
        };
    }

    componentDidMount() {
        this.prepareLabel(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.prepareLabel(nextProps);
    }

    prepareLabel(props) {
        const value = props.value.toLowerCase();
        let label = null;
        if (!props.search || value.indexOf(props.search.toLowerCase()) === -1) {
            // nothing is being searched (or there are no matches), so nothing needs to be
            // highlighted
            label = props.value;
        }

        else {
            // there is a search value, so we need to highlight the matched parts
            const search = props.search.toLowerCase();
            label = value;

            // split the string up into parts based on the search term
            const parts = value.split(search);

            let position = 0;
            const output = [];
            parts.forEach((part, index) => {
                const unmatchedPos = position + part.length;
                if (part.length > 0) {
                    // add the unmatched parts of the label
                    const unmatched = props.value.substring(position, unmatchedPos);
                    output.push(<span key={`unmatch-${index}`}>
                        {unmatched}
                    </span>);
                }

                if (index < parts.length - 1) {
                    // add the matched parts of the label
                    const matchedPos = unmatchedPos + search.length;
                    const matchedValue = props.value.substring(unmatchedPos, matchedPos);
                    const matched = (<span className="matched-highlight" key={`match-${index}`}>
                        {matchedValue}
                    </span>);
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

    render() {
        return (
            <li>
                <button
                    className="guide-link">
                    {this.state.label}
                </button>
            </li>
        );
    }
}

ResultItem.propTypes = propTypes;
