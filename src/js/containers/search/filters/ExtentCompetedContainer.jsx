/**
 * ExtentCompetedContainer.jsx
 * Created by Emily Gullo on 6/22/17
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { is } from 'immutable';
import { QAT } from 'GlobalConstants';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';
import ContractFilter from 'components/search/filters/contractFilters/ContractFilter';
import ListCheckbox from 'components/sharedComponents/checkbox/ListCheckbox';
import { extentCompetedDefinitions, extentCompetedTypeMapping } from 'dataMapping/search/contractFields';
import { EntityDropdownAutocomplete } from "../../../components/search/filters/location/EntityDropdownAutocomplete";

const propTypes = {
    updateExtentCompeted: PropTypes.func,
    extentCompeted: PropTypes.object,
    appliedEC: PropTypes.object
};

const ExtentCompetedContainer = ({ updateExtentCompeted, extentCompeted, appliedEC }) => {
    const [searchString, setSearchString] = useState('');
    const [filterCategoryMapping, setFilterCategoryMapping] = useState(extentCompetedTypeMapping);

    const selectExtentCompeted = (value) => {
        updateExtentCompeted(value);
    };

    const dirtyFilters = () => {
        if (is(extentCompeted, appliedEC)) {
            return null;
        }
        return Symbol('dirty extent competed');
    };

    const handleTextInputChange = (e) => {
        setSearchString(e.target.value);
    };

    const onClear = () => {
        setSearchString('');
    };

    const searchCategoryMapping = () => {
        // filter out definitions based on search text
        // eslint-disable-next-line no-unused-vars
        const filteredDefinitions = Object.fromEntries(Object.entries(extentCompetedDefinitions).filter(([key, value]) => value.toLowerCase().includes(searchString.toLowerCase())));

        // filter out type mapping filters based on filteredDefinitions
        const filteredCategories = extentCompetedTypeMapping.map((type) => ({
            ...type,
            filters: type.filters.filter((v) => Object.keys(filteredDefinitions).includes(v))
        }));

        setFilterCategoryMapping(filteredCategories);
    };

    useEffect(() => {
        searchCategoryMapping();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchString]);

    return (
        <div className="extent-competed-filter">
            <EntityDropdownAutocomplete
                placeholder="Search filters..."
                searchString={searchString}
                enabled
                handleTextInputChange={handleTextInputChange}
                context={{}}
                loading={false}
                isClearable
                onClear={onClear} />
            {QAT ?
                <ListCheckbox
                    filterCategoryMapping={filterCategoryMapping}
                    filters={extentCompetedDefinitions}
                    selectedFilters={extentCompeted}
                    singleFilterChange={updateExtentCompeted} />
                :
                <ContractFilter
                    extentCompeted={extentCompeted}
                    dirtyFilters={dirtyFilters()}
                    contractFilterType="extent_competed"
                    contractFilterOptions="extentCompetedDefinitions"
                    contractFilterState="extentCompeted"
                    toggleFilter={selectExtentCompeted} />
            }
        </div>
    );
};

ExtentCompetedContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        extentCompeted: state.filters.extentCompeted,
        appliedEC: state.appliedFilters.filters.extentCompeted
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(ExtentCompetedContainer);
