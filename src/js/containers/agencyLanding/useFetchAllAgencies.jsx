import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'js-search';
import { useSelector } from 'react-redux';
import { fetchAllAgencies } from '../../helpers/agencyLandingHelper';
import { formatMoneyWithPrecision } from '../../helpers/moneyFormatter';
import { sanitizeUrl } from '../../helpers/url';
import { orderBy } from 'lodash-es';

const useFetchAllAgencies = (searchString = '') => {
    const { field, direction } = useSelector((state) => state.agencyLanding.agenciesOrder);

    const { data, isLoading } = useQuery({
        queryKey: ['fetchAllAgencies'],
        queryFn: () => fetchAllAgencies({ sort: 'percentage_of_total_budget_authority', order: 'desc' }).promise
    });

    const agencies = useMemo(() => {
        const agenciesArray = [];

        if (!data?.data) return agenciesArray;

        data.data.results.forEach((item) => {
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
            agenciesArray.push(agency);
        });

        return agenciesArray;
    }, [data]);

    const results = useMemo(() => {
        // perform a local search
        const search = new Search('agency_id');
        search.addIndex('agency_name');
        search.addDocuments(agencies);

        // return the full data set if no search string is provided
        let filteredResults = agencies;
        if (searchString !== '') {
            filteredResults = search.search(searchString);
        }

        // now sort the results by the appropriate table column and direction
        return orderBy(filteredResults, [field], [direction]);
    }, [agencies, searchString, field, direction]);

    const resultsText = results.length === 1 ? '1 result' : `${results.length} results`;

    return { isLoading, results, resultsText };
};

export default useFetchAllAgencies;
