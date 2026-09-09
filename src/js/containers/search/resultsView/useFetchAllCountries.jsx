/**
 * useFetchAllCountries.jsx
 * Created by Josue Aguilar 09/04/2026
 */

import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../../helpers/apiRequest";

// perform search is a cancellable promise
const fetchAllCountries = () => apiRequest({
    url: 'v2/references/countries'
});

const useFetchAllCountries = () => {
    const query = useQuery({
        queryKey: ['fetchAllCountries'],
        queryFn: () => fetchAllCountries().promise,
        staleTime: Infinity
    })

    const countries = query.data?.data?.results || []
    const countryAbbreviations = query.data?.data?.results.map(({ code }) => code) || []

    return { countries, countryAbbreviations, ...query };
}

export default useFetchAllCountries;
