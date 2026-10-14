/**
 * AgencyLandingContainer.jsx
 * Created by Lizzie Salita 7/7/17
 */

import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { isCancel } from 'axios';

import { Search } from 'js-search';
import { orderBy } from 'lodash-es';

import { sanitizeUrl } from 'helpers/url';

import AgencyLandingContent from 'components/agencyLanding/AgencyLandingContent';
import AgenciesTableFields from '../../dataMapping/agencyLanding/agenciesTableFields';
import { fetchAllAgencies } from '../../helpers/agencyLandingHelper';
import { formatMoneyWithPrecision } from '../../helpers/moneyFormatter';

const AgencyLandingContainer = () => {
    const agenciesOrder = useSelector((state) => state.agencyLanding.agenciesOrder);
    const [columns, setColumns] = useState([]);
    const [inFlight, setInFlight] = useState(false);
    const [currentFY] = useState('');
    const [agencySearchString, setAgencySearchString] = useState('');
    const [fullData, setFullData] = useState([]);
    const [results, setResults] = useState([]);

    const agenciesRequest = useRef(null);

    const parseAgencies = (data) => {
        const agencies = [];
        data.results.forEach((item) => {
            // Format budget authority amount
            const formattedCurrency =
                formatMoneyWithPrecision(item.budget_authority_amount, 0);

            // Convert from decimal value to percentage and round to 2 decimal places
            const formattedPercentage = (item.percentage_of_total_budget_authority * 100).toFixed(2);

            let percent = `${formattedPercentage}%`;
            if (percent === '0.00%') {
                percent = 'Less than 0.01%';
            }

            let abbreviation = '';
            if (item.abbreviation !== null && item.abbreviation !== '') {
                abbreviation = `(${item.abbreviation})`;
            }

            const agency = {
                agency_id: item.agency_slug || item.agency_id,
                agency_name: `${item.agency_name} ${abbreviation}`,
                budget_authority_amount: item.budget_authority_amount,
                percentage_of_total_budget_authority: item.percentage_of_total_budget_authority,
                display: {
                    agency_name: `${item.agency_name} (${item.abbreviation})`,
                    budget_authority_amount: formattedCurrency,
                    percentage_of_total_budget_authority: percent,
                    congressional_justification_url: sanitizeUrl(item.congressional_justification_url) ||
                        'not available'
                }
            };
            agencies.push(agency);
        });

        setFullData(agencies);
    };

    const showColumns = () => {
        const columnsLocal = [];
        const sortOrder = AgenciesTableFields.defaultSortDirection;

        AgenciesTableFields.order.forEach((col) => {
            let displayName = AgenciesTableFields[col];
            if ((col === 'budget_authority_amount') ||
                (col === 'percentage_of_total_budget_authority')) {
                // Add (FY YYYY) to Budget Authority and Percent of Total U.S. Budget column headers
                if (currentFY) {
                    displayName = `${displayName} (FY ${currentFY})`;
                }
            }
            const column = {
                columnName: col,
                displayName,
                defaultDirection: sortOrder[col]
            };
            columnsLocal.push(column);
        });

        setColumns(columnsLocal);
    };

    const fetchAgencies = () => {
        if (agenciesRequest.current) {
            // a request is in-flight, cancel it
            agenciesRequest.current.cancel();
        }

        setInFlight(true);

        // generate the params
        const params = {
            sort: agenciesOrder.field,
            order: agenciesOrder.direction
        };

        agenciesRequest.current = fetchAllAgencies(params);

        agenciesRequest.current.promise
            .then((res) => {
                setInFlight(false);
                parseAgencies(res.data);
            })
            .catch((err) => {
                agenciesRequest.current = null;
                if (!isCancel(err)) {
                    setInFlight(false);
                    console.log(err);
                }
            });
    };

    useEffect(() => {
        fetchAgencies();
    }, [columns]);

    const performSearch = () => {
    // perform a local search
        const search = new Search('agency_id');
        search.addIndex('agency_name');
        search.addDocuments(fullData);

        // return the full data set if no search string is provided
        let results = fullData;
        if (agencySearchString !== '') {
            results = search.search(agencySearchString);
        }

        // now sort the results by the appropriate table column and direction
        const orderedResults = orderBy(results,
            [agenciesOrder.field], [agenciesOrder.direction]);

        setResults(orderedResults);
    };

    useEffect(() => {
        performSearch();
    }, [fullData]);

    const resultsCount = results.length;
    let resultsText = `${resultsCount} results`;
    if (resultsCount === 1) {
        resultsText = `${resultsCount} result`;
    }

    const setAgencySearchStringLocal = (string) => {
        let searchValue = '';
        if (string.length > 2) {
            searchValue = string;
        }

        setAgencySearchString(searchValue);
    };

    useEffect(() => {
        performSearch();
    }, [agencySearchString, agenciesOrder]);

    useEffect(() => {
        showColumns();

        return () => agenciesRequest.current.cancel();
    }, []);

    return (
        <AgencyLandingContent
            resultsText={resultsText}
            results={results}
            agencySearchString={agencySearchString}
            inFlight={inFlight}
            columns={columns}
            sort={agenciesOrder}
            setAgencySearchString={setAgencySearchStringLocal} />
    );
};

export default AgencyLandingContainer;
