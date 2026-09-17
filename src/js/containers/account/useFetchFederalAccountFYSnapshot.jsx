import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fiscalYearSnapshotFields } from "../../dataMapping/accounts/accountFields";
import { fetchFederalAccountFYSnapshot } from "../../apis/account";

const useFetchFederalAccountFYSnapshot = (account, year) => {
    const { data, isLoading } = useQuery({
        queryKey: ['fetchFederalAccountFYSnapshot', account.id, year],
        queryFn: () => fetchFederalAccountFYSnapshot(account.id, year).promise,
        enabled: !!year && !!account
    })

    const response = useMemo(() => {
        if (!data) return;

        const results = data.data.results;

        const balances = {
            available: false
        };

        if (Object.keys(data).length > 0 && results) {
            // console.log(results)
            Object.keys(fiscalYearSnapshotFields).forEach((key) => {
                balances[fiscalYearSnapshotFields[key]] = results[key];
            });
            balances.available = true;
        }

        return { ...account, totals: balances };
    }, [account, data]);

    return { response, isLoading }
}

export default useFetchFederalAccountFYSnapshot;
