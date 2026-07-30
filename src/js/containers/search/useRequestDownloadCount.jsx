import { useQueries } from "@tanstack/react-query";
import { requestDownloadCount } from "helpers/downloadHelper";
import { areFiltersEqual } from "helpers/searchHelper";
import SearchAwardsOperation from "models/v1/search/SearchAwardsOperation";

const spendingLevels = [
    { level: "awards", auditText: "Awards" },
    { level: "subawards", auditText: "Subawards" },
    { level: "transactions", auditText: "Transactions" }
]

const combine = (results) => ({
    data: results.map((result) => result?.data?.data?.calculated_count || 0),
    downloadInFlight: results.some((result) => result.isLoading)
})

const useRequestDownloadCount = (filters, hash, areAppliedFiltersEmpty, spendingLevel) => {
    const operation = new SearchAwardsOperation();
    operation.fromState(filters);

    const { data, downloadInFlight} = useQueries({
        queries: spendingLevels.map(({
            level,
            auditText
        }) => {
            if (level === "subawards") delete operation.dateType;
            const searchParams = operation.toParams();
            return ({
                queryKey: ['requestDownloadCount', level, searchParams],
                queryFn: () => requestDownloadCount({
                    filters: searchParams,
                    spending_level: level,
                    auditTrail: `Download Availability Count ${auditText}`
                }).promise,
                staleTime: Infinity,
                refetchOnWindowFocus: false,
                enabled: (!areFiltersEqual(filters) || !hash) && !areAppliedFiltersEmpty
            });
        }),
        combine
    });

    const [awardsCount, subawardsCount, transactionsCount] = data;

    const downloadAvailable = () => {
        if (
            (awardsCount === 0 || awardsCount >= 500000) &&
            (transactionsCount === 0 || transactionsCount >= 500000) &&
            (
                spendingLevel === 'awards' ||
                (subawardsCount === 0 || subawardsCount >= 500000)
            )
        ) {
            return false;
        }
        else if (
            awardsCount !== 0 ||
            transactionsCount !== 0 ||
            (spendingLevel === 'subawards' && subawardsCount !== 0)
        ) {
            return true;
        }
    }

    return {
        awardsCount,
        subawardsCount,
        transactionsCount,
        downloadInFlight,
        downloadAvailable: downloadAvailable()
    }
}

export default useRequestDownloadCount;
