/**
 * Created by michaelbray on 1/27/17.
 */

import React from 'react';
import Suggestion from './Suggestion';

const propTypes = {
    select: React.PropTypes.func,
    suggestions: React.PropTypes.array,
    selectedIndex: React.PropTypes.number,
    maxSuggestions: React.PropTypes.number
};

const defaultProps = {
    suggestions: [],
    shown: '',
    selectedIndex: 0,
    maxSuggestions: 10
};

export default class SuggestionHolder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hidden: ' hide'
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.suggestions.length > 0 && nextProps.shown !== 'hidden') {
            this.setState({
                hidden: ''
            });
        }
        else {
            this.setState({
                hidden: ' hide'
            });
        }
    }

    render() {
        const suggestions = [];

        // Ensure we're only showing maxSuggestions results at most
        for (let i = 0; i < Math.min(this.props.suggestions.length,
            this.props.maxSuggestions); i++) {
            suggestions.push(<Suggestion
                title={this.props.suggestions[i].title}
                subtitle={this.props.suggestions[i].subtitle}
                data={this.props.suggestions[i]}
                selected={i === this.props.selectedIndex}
                select={this.props.select}
                key={i} />);
        }

        return (
            <div className={`autocomplete${this.state.hidden}`}>
                <ul>
                    {suggestions}
                </ul>
            </div>
        );
    }
}

SuggestionHolder.defaultProps = defaultProps;
SuggestionHolder.propTypes = propTypes;
