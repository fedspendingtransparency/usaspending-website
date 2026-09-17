import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFederalAccount } from "../../apis/account";
import FederalAccount from "../../models/v1/account/FederalAccount";

const defaultValues = [
    null,
    '',
    '',
    '',
    {
        available: false,
        obligated: 0,
        unobligated: 0,
        budgetAuthority: 0,
        outlay: 0,
        balanceBroughtForward: 0,
        otherBudgetaryResources: 0,
        appropriations: 0
    },
    ''
]

const useFetchFederalAccount = (accountNumber) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['fetchFederalAccount', accountNumber],
        queryFn: () => fetchFederalAccount(accountNumber).promise
    })

    const readyData = useMemo(() => new FederalAccount(data?.data || defaultValues), [data]);

    return { account: readyData, loading: isLoading, error: isError }
}

export default useFetchFederalAccount;
