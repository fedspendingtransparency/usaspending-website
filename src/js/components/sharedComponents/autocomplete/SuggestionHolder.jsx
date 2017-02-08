/**
 * Created by michaelbray on 1/27/17.
 */

import React from 'react';
import Suggestion from './Suggestion';

const propTypes = {
    suggestions: React.PropTypes.array,
    shown: React.PropTypes.string,
    selectedIndex: React.PropTypes.number,
    select: React.PropTypes.func
};

const defaultProps = {
    suggestions: [],
    shown: '',
    selectedIndex: 0
};

export default class SuggestionHolder extends React.Component {
    constructor(props) {
        super(props);

        this.hidden = true;
    }

    render() {
        const suggestions = [];
        if (this.props.suggestions.length > 0 && this.props.shown !== 'hidden') {
            this.hidden = false;
        }
        else {
            this.hidden = true;
        }

        // Ensure we're only showing 10 results at most
        for (let i = 0; i < Math.min(this.props.suggestions.length, 10); i++) {
            suggestions.push(<Suggestion
                title={this.props.suggestions[i].title}
                subtitle={this.props.suggestions[i].subtitle}
                location={this.props.suggestions[i]}
                selected={i === this.props.selectedIndex}
                select={this.props.select}
                key={i} />);
        }

        return (
            <div className="autocomplete" hidden={this.hidden}>
                <ul>
                    {suggestions}
                </ul>
            </div>
        );
    }
}

SuggestionHolder.defaultProps = defaultProps;
SuggestionHolder.propTypes = propTypes;
