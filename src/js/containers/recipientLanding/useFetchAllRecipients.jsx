import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllRecipients } from 'helpers/recipientLandingHelper';
import BaseRecipientLandingRow from 'models/v2/recipient/BaseRecipientLandingRow';

const useFetchAllRecipients = ({ order, sort, page, limit, awardType, keyword = '' }) => {
    const params = { order, sort, page, limit, award_type: awardType };

    if (keyword !== '') params.keyword = keyword;

    const { data, isLoading, isError } = useQuery({
        queryKey: ['fetchAllRecipients', params],
        queryFn: () => fetchAllRecipients(params).promise
    });

    const { results, totalItems } = useMemo(() => {
        if (!data?.data) return { results: [], totalItems: 0 };

        const resultsArray = [];

        data.data.results.forEach((item) => {
            const recipient = Object.create(BaseRecipientLandingRow);
            recipient.populate(item);
            if (recipient.duns !== 'DUNS not provided' || recipient.name !== 'Not provided in source system') {
                resultsArray.push(recipient);
            }
        });

        return { results: resultsArray, totalItems: data.data.page_metadata.total };
    }, [data]);

    return { results, totalItems, loading: isLoading, error: isError };
};

export default useFetchAllRecipients;
