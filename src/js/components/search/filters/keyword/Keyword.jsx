/**
 * Keyword.jsx
 * Created by Emily Gullo 10/18/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';

import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import IndividualSubmit from 'components/search/filters/IndividualSubmit';
import SelectedKeywords from './SelectedKeywords';

const propTypes = {
    selectedKeywords: PropTypes.array,
    toggleKeyword: PropTypes.func,
    dirtyFilter: PropTypes.symbol
};

export default class Keyword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.changedInput = this.changedInput.bind(this);
        this.searchKeyword = this.searchKeyword.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.dirtyFilter && prevProps.dirtyFilter !== this.props.dirtyFilter) {
            if (this.hint) {
                this.hint.showHint();
            }
        }
    }

    changedInput(e) {
        this.setState({
            value: e.target.value
        });
    }

    searchKeyword(e) {
        e.preventDefault();
        if (this.state.value !== '') {
            this.props.toggleKeyword(this.state.value);
        }
        this.setState({
            value: ''
        });
    }

    toggleKeyword() {
        if (this.searchInput) {
            // focus on the input field for accessibility users
            this.searchInput.focus();
        }
        this.props.toggleKeyword();
    }

    render() {
        const accessibility = {
            'aria-controls': 'selected-keyword-tags'
        };

        const selectedKeywords = (<SelectedKeywords
            toggleKeyword={this.props.toggleKeyword}
            selectedKeywords={this.props.selectedKeywords} />);

        return (
            <div className="keyword-filter search-filter">
                <form onSubmit={this.searchKeyword}>
                    <div className="filter-item-wrap">
                        <div className="keyword-input-wrapper">
                            <input
                                id="search"
                                type="text"
                                className="keyword-input"
                                placeholder="Search by Keyword"
                                value={this.state.value}
                                onChange={this.changedInput}
                                ref={(input) => {
                                    this.searchInput = input;
                                }} />
                            <IndividualSubmit
                                className="keyword-submit"
                                onClick={this.searchKeyword}
                                label="Filter by keyword"
                                accessibility={accessibility} />
                        </div>
                        {selectedKeywords}
                        <SubmitHint
                            ref={(component) => {
                                this.hint = component;
                            }} />
                    </div>
                </form>
            </div>
        );
    }
}
Keyword.propTypes = propTypes;
