/**
 * CategoriesVisualizationWrapperContainer.jsx (previously RankVisualizationWrapperContainer.jsx)
 * Created by michaelbray on 4/3/17.
 */

import React, { useEffect, useState, useCallback } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useSearchParams } from "react-router";
import { get, max } from 'lodash-es';
import * as searchFilterActions from 'redux/actions/search/searchFilterActions';
import { setAppliedFilterCompletion } from 'redux/actions/search/appliedFilterActions';

import SearchSectionWrapper from "../../../components/search/resultsView/SearchSectionWrapper/SearchSectionWrapper";
import SpendingByCategoriesChart
    from "../../../components/search/resultsView/categories/SpendingByCategoriesChart";
import CategoriesSectionWrapper from "../../../components/search/resultsView/categories/CategoriesSectionWrapper";
import * as MoneyFormatter from "../../../helpers/moneyFormatter";
import useCategoriesSearch from "./useCategoriesSearch";

const combinedActions = Object.assign({}, searchFilterActions, {
    setAppliedFilterCompletion
});

const propTypes = {
    reduxFilters: PropTypes.object,
    setAppliedFilterCompletion: PropTypes.func,
    noApplied: PropTypes.bool,
    agencyIds: oneOfType([PropTypes.array, PropTypes.object]),
    error: PropTypes.bool,
    wrapperProps: PropTypes.object,
    setSelectedDropdown: PropTypes.func,
    hash: PropTypes.string,
    spendingLevel: PropTypes.string,
    selectedDropdown: PropTypes.string
};
const columns = {
    recipient: [
        {
            title: 'name',
            displayName: ["Recipient Name"],
            right: false
        },
        {
            title: 'obligations',
            displayName: ["Obligations"],
            right: true
        }
    ],
    awarding_agency: [
        {
            title: 'awarding_agency',
            displayName: ["Awarding Agency"],
            right: false
        },
        {
            title: 'obligations',
            displayName: ["Obligations"],
            right: true
        }
    ],
    awarding_subagency: [
        {
            title: 'awarding_subagency',
            displayName: ["Awarding Subagency"],
            right: false
        },
        {
            title: 'obligations',
            displayName: ["Obligations"],
            right: true
        }
    ],
    cfda: [
        {
            title: 'cfda',
            displayName: ["Assistance Listing"],
            right: false
        },
        {
            title: 'obligations',
            displayName: ["Obligations"],
            right: true
        }
    ],
    naics: [
        {
            title: 'naics',
            displayName: ["North American Industry Classification System (NAICS)"],
            right: false
        },
        {
            title: 'obligations',
            displayName: ["Obligations"],
            right: true
        }
    ],
    psc: [
        {
            title: 'psc',
            displayName: ["Product and Service Code (PSC)"],
            right: false
        },
        {
            title: 'obligations',
            displayName: ["Obligations"],
            right: true
        }
    ]
};
const CategoriesVisualizationWrapperContainer = ({ selectedDropdown, setSelectedDropdown, ...props }) => {
    const [sortDirection, setSortDirection] = useState('desc');
    const [activeField, setActiveField] = useState('obligations');
    // eslint-disable-next-line no-unused-vars
    const [spendingBy, setSpendingBy] = useState('awardingAgency');
    const [page, setPage] = useState(1);
    // const [tableRows, setTableRows] = useState([]);
    const [searchParams] = useSearchParams();

    let recipientError = false;

    const {
        loading,
        error,
        labelSeries,
        dataSeries,
        descriptions,
        linkSeries,
        tableData,
        next,
        previous,
        hasNextPage,
        hasPreviousPage
    } = useCategoriesSearch(
        spendingBy,
        props.reduxFilters,
        props.spendingLevel,
        selectedDropdown,
        page,
        props.agencyIds,
        props.error
    );

    // TODO: Does this error actually work?
    if (error) {
        recipientError = (
            get(error, 'response.data.detail', '') ===
            'Current filters return too many unique items. Narrow filters to return results.'
        )
    }

    const childProps = {
        spendingBy,
        loading,
        error,
        labelSeries,
        dataSeries,
        descriptions,
        linkSeries,
        page,
        scope: selectedDropdown,
        next,
        previous,
        hasNextPage,
        hasPreviousPage,
        recipientError
    };

    const updatedTable = [...tableData];

    if (sortDirection === 'asc') {
        updatedTable.sort((a, b) => {
            if (activeField === 'obligations') {
                return a[activeField] - b[activeField];
            }
            return a.name.title.localeCompare(b.name.title);
        });
    }

    if (sortDirection === 'desc') {
        updatedTable.sort((a, b) => {
            if (activeField === 'obligations') {
                return b[activeField] - a[activeField];
            }
            return b.name.title.localeCompare(a.name.title);
        });
    }

    const tableRows = [];

    updatedTable.forEach((row) => {
        const rowArray = [];
        Object.keys(row).forEach((key) => {
            if (key === 'obligations') {
                rowArray.push(MoneyFormatter.formatMoneyWithPrecision(row[key], 0));
            }
            else if (row[key].value === undefined) {
                rowArray.push(row[key]);
            }
            else {
                rowArray.push(row[key]?.value);
            }
        });
        tableRows.push(rowArray);
    });

    const sortBy = useCallback((field, direction) => {
        setSortDirection(direction);
        setActiveField(field);
    }, []);

    const nextPage = useCallback(() => {
        if (hasNextPage) {
            setPage((prevState) => prevState + 1);
        }
    }, [hasNextPage]);

    const previousPage = useCallback(() => {
        // change the state by subtracting 2 (since the page number is already incremented)
        const prevPage = max([1, page - 1]);
        setPage(prevPage);
    }, [page]);


    useEffect(() => {
        props.setAppliedFilterCompletion(true);
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [
        labelSeries,
        dataSeries,
        descriptions,
        linkSeries,
        loading,
        error,
        next,
        previous,
        hasNextPage,
        hasPreviousPage
    ]);

    useEffect(() => {
        const section = searchParams.get('section');

        const type = searchParams.get('type');
        if (section && type) {
            const rankVal = type;
            if (rankVal === "naics" || rankVal === "psc") {
                setSelectedDropdown(rankVal);
            }
        }
    }, [searchParams, setSelectedDropdown]);

    // useEffect(() => {
    //     if (!props.noApplied) {
    //         setPage(1);
    //     }
    //     /* eslint-disable-next-line react-hooks/exhaustive-deps */
    // }, [props.reduxFilters, props.spendingLevel]);

    return (
        <div
            className="results-visualization-rank-section"
            id="results-section-rank">
            <SearchSectionWrapper
                {...props.wrapperProps}
                {...childProps}
                page={page}
                setPage={setPage}
                columns={columns[selectedDropdown]}
                sortBy={sortBy}
                setSortDirection={setSortDirection}
                rows={tableRows}
                sortDirection={sortDirection}
                activeField={activeField}
                setActiveField={setActiveField}
                isLoading={childProps?.loading}
                isError={childProps?.error}
                hasNoData={childProps?.labelSeries?.length === 0}
                hash={props.hash}
                hasNextPage={hasNextPage}
                hasPreviousPage={hasPreviousPage}
                nextPage={nextPage}
                previousPage={previousPage}>
                <CategoriesSectionWrapper
                    {...childProps}
                    nextPage={nextPage}
                    previousPage={previousPage}>
                    <SpendingByCategoriesChart
                        {...childProps}
                        hash={props.hash} />
                </CategoriesSectionWrapper>
            </SearchSectionWrapper>
        </div>
    );
};

CategoriesVisualizationWrapperContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        reduxFilters: state.appliedFilters.filters,
        noApplied: state.appliedFilters._empty,
        spendingLevel: state.searchView.spendingLevel
    }),
    (dispatch) => bindActionCreators(combinedActions, dispatch)
)(CategoriesVisualizationWrapperContainer);
