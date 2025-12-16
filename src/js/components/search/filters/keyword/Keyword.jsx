/**
 * Keyword.jsx
 * Created by Emily Gullo 10/18/2016
 **/

import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from "data-transparency-ui";
import { useDispatch } from "react-redux";

import IndividualSubmit from 'components/search/filters/IndividualSubmit';
import { updateTextSearchInput } from "redux/actions/search/searchFilterActions";
import SelectedKeywords from './SelectedKeywords';
import { KeyWordTooltip } from "../tooltips/AdvancedSearchTooltip";
import ContextTooltip from "../timePeriod/ContextTooltip";

const propTypes = {
    searchV2: PropTypes.bool
};

const Keyword = ({
    searchV2
}) => {
    const [value, setValue] = useState('');
    const searchInputRef = useRef(null);
    const dispatch = useDispatch();

    const accessibility = {
        'aria-controls': 'selected-keyword-tags'
    };

    const changedInput = (e) => {
        setValue(e.target.value);
    };

    const searchKeyword = (e) => {
        e.preventDefault();
        if (value !== '') {
            dispatch(updateTextSearchInput(value));
        }
        setValue('');
    };

    const toggleKeyword = (keyword) => {
        if (searchInputRef.current) {
            // focus on the input field for accessibility users
            searchInputRef.current.focus();
        }
        dispatch(updateTextSearchInput(keyword));
    };


    return (
        <div className="keyword-filter search-filter">
            <form onSubmit={searchKeyword}>
                <div className="filter-item-wrap">
                    { searchV2 &&
                        <div className="category-header">
                            <div className="category-header--title">
                                Filter by Keyword
                            </div>
                            <ContextTooltip tooltip={<KeyWordTooltip />} />
                        </div>
                    }
                    <div className="keyword-input-wrapper">
                        <input
                            id="search"
                            type="text"
                            className="keyword-input"
                            placeholder={
                                searchV2 ?
                                    'Search using keywords...' :
                                    "Search by Keyword"
                            }
                            value={value}
                            onChange={changedInput}
                            ref={searchInputRef} />
                        { searchV2 ?
                            <Button
                                copy="Add"
                                buttonTitle="Add"
                                buttonSize="sm"
                                buttonType="primary"
                                backgroundColor="light"
                                disabled={value.length === 0}
                                onClick={searchKeyword} />
                            :
                            <IndividualSubmit
                                className="keyword-submit"
                                onClick={searchKeyword}
                                label="Filter by keyword"
                                accessibility={accessibility} />
                        }
                    </div>
                    <SelectedKeywords toggleKeyword={toggleKeyword} />
                </div>
            </form>
        </div>
    );
};

Keyword.propTypes = propTypes;
export default Keyword;
