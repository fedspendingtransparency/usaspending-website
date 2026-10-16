import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTasCategoryTotals } from "../../../apis/account";
import AccountSearchOperation from "../../../models/v1/account/queries/AccountSearchOperation";
import { categoryLabelFields } from "../../../dataMapping/accounts/accountFields";
import { formatMoney } from "../../../helpers/moneyFormatter";

const useAccountSearchOperation = (group, id, page, categoryScope) => {
    const filters = new AccountSearchOperation(id);

    const { data, isError, isLoading } = useQuery({
        queryKey: ['fetchTasCategoryTotals', group, filters, page, categoryScope],
        queryFn: () => fetchTasCategoryTotals({
            group,
            field: 'obligations_incurred_by_program_object_class_cpe',
            aggregate: 'sum',
            order: ['-aggregate'],
            filters: filters.toParams(),
            page,
            limit: 5,
            auditTrail: `Rank vis - ${categoryScope}`
        }).promise
    });

    const parsedData = useMemo(() => {
        const results = data?.data.results;

        const labelSeries = [];
        const dataSeries = [];
        const descriptions = [];

        if (!results) return {
            labelSeries,
            dataSeries,
            descriptions,
            hasNextPage: false,
            hasPreviousPage: false
        }

        const labelField = categoryLabelFields[categoryScope];

        // iterate through each response object and break it up into groups, x series, and y series
        data.data.results.forEach((item) => {
            const adjustedValue = parseFloat(item.aggregate);

            labelSeries.push(item[labelField]);
            dataSeries.push(parseFloat(adjustedValue));

            const description = `Obligated balance for ${item[labelField]}: \
${formatMoney(adjustedValue)}`;
            descriptions.push(description);
        });

        return {
            labelSeries,
            dataSeries,
            descriptions,
            hasNextPage: data.data.page_metadata.has_next_page,
            hasPreviousPage: data.data.page_metadata.has_previous_page
        }
    }, [data, categoryScope]);

    return { data: parsedData, error: isError, loading: isLoading }
}

export default useAccountSearchOperation;
