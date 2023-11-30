import { performSpendingByCategorySearch } from "helpers/searchHelper";
import wrapPromise from "./wrapPromise";

// this is with only fy24 chosen from filters
const apiParamsObj =
    {
        category: "awarding_agency",
        filters: {
            time_period: [
                {
                    start_date: "2023-10-01",
                    end_date: "2024-09-30"
                }
            ]
        },
        limit: 10,
        page: 1,
        auditTrail: "Awarding Agency Rank Visualization",
        subawards: false
    };

function fetchSpendingOverTimeData() {
    const promise = performSpendingByCategorySearch(apiParamsObj).promise.then(({ data }) => data);

    return wrapPromise(promise);
}

export default fetchSpendingOverTimeData;
