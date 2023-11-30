import { performSpendingOverTimeSearch } from "helpers/searchHelper";
import wrapPromise from "./wrapPromise";

// this is with only fy24 chosen from filters
const apiParamsObj =
    {
        group: "fiscal_year",
        filters: {
            time_period: [
                {
                    start_date: "2023-10-01",
                    end_date: "2024-09-30"
                }
            ]
        },
        subawards: false,
        auditTrail: "Spending Over Time Visualization"
    };

function fetchSpendingOverTimeData() {
    const promise = performSpendingOverTimeSearch(apiParamsObj).promise.then(({ data }) => data);

    return wrapPromise(promise);
}

export default fetchSpendingOverTimeData;
