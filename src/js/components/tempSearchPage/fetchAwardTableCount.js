import { performSpendingByAwardTabCountSearch } from "helpers/searchHelper";
import wrapPromise from "./wrapPromise";

// this is with only fy24 chosen from filters
const apiParamsObj =
    {
        time_period: [
            {
                start_date: "2023-10-01",
                end_date: "2024-09-30"
            }
        ]
    };

function fetchAwardTableCount() {
    const promise = performSpendingByAwardTabCountSearch({ filters: apiParamsObj }).promise.then(({ data }) => data);

    return wrapPromise(promise);
}

export default fetchAwardTableCount;
