/**
 * DataDictionarySearchBar.jsx
 * Created by Lizzie Salita 9/28/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Search, Close } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    setSearchString: PropTypes.func.isRequired
};

export default class DataDictionarySearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            hasSubmit: false
        };
        this.onChange = this.onChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }


    onChange(e) {
        this.setState({
            term: e.target.value,
            hasSubmit: false
        });
    }

    onSubmit() {
        this.setState({
            hasSubmit: true
        });
        this.props.setSearchString(this.state.term);
    }

    resetSearch() {
        this.setState({
            hasSubmit: false,
            term: ''
        });
        this.props.setSearchString('');
    }

    handleClick(e) {
        e.preventDefault();
        if (this.state.hasSubmit) {
            this.resetSearch();
        }
        else {
            this.onSubmit();
        }
    }

    render() {
        let icon = (
            <Search alt="Search Data Dictionary" />
        );
        if (this.state.hasSubmit) {
            icon = (
                <Close alt="Reset Data Dictionary search" />
            );
        }
        return (
            <div className="dictionary-search">
                <form className="dictionary-search__form">
                    <input
                        className="dictionary-search__input"
                        aria-label="Dictionary Search Input"
                        type="text"
                        value={this.state.term}
                        onChange={this.onChange}
                        placeholder="Search by Term" />
                    <button
                        aria-label="Search"
                        className="dictionary-search__button"
                        onClick={this.handleClick} >
                        <div className="dictionary-search__button-icon">
                            {icon}
                        </div>
                    </button>
                </form>
            </div>
        );
    }
}

DataDictionarySearchBar.propTypes = propTypes;
