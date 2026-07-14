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

const useRequestDownloadCount = (filters, hash, areAppliedFiltersEmpty) => {
    const operation = new SearchAwardsOperation();
    operation.fromState(filters);
    const searchParams = operation.toParams();

    return useQueries({
        queries: spendingLevels.map(({
            level,
            auditText
        }) => ({
            queryKey: ['requestDownloadCount', level, searchParams],
            queryFn: () => requestDownloadCount({
                filters: searchParams,
                spending_level: level,
                auditTrail: `Download Availability Count ${auditText}`
            }).promise,
            staleTime: Infinity,
            refetchOnWindowFocus: false,
            enabled: (!areFiltersEqual(filters) || !hash) && !areAppliedFiltersEmpty
        })),
        combine
    });
}

export default useRequestDownloadCount;
