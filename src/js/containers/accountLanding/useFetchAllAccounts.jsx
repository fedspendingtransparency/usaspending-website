import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllAccounts } from '../../helpers/accountLandingHelper';
import BaseFederalAccountLandingRow from '../../models/v1/accountLanding/BaseFederalAccountLandingRow';

const useFetchAllAccounts = (sort, page, fy, keyword) => {
    const params = {
        sort, page, limit: 50, filters: { fy: `${fy}` }
    };

    if (keyword) params.keyword = keyword;

    const { data, isLoading, isError } = useQuery({
        queryKey: ['fetchAllAccounts', sort, page, fy, keyword],
        queryFn: () => fetchAllAccounts(params).promise,
        enabled: !!fy
    });

    const { results, totalItems } = useMemo(() => {
        const accountsArray = [];

        if (!data?.data) return { results: accountsArray, totalItems: 0 };

        data.data.results.forEach((item) => {
            const account = Object.create(BaseFederalAccountLandingRow);
            account.parse(item);
            accountsArray.push(account);
        });

        return { results: accountsArray, totalItems: data.data.count };
    }, [data]);

    return { isLoading, isError, results, totalItems };
};

export default useFetchAllAccounts;
