import { performSpendingByAwardSearch } from "helpers/searchHelper";
import wrapPromise from "./wrapPromise";

// this is with only fy24 chosen from filters
const paramsObj =
{
    filters: {
        time_period: [
            {
                start_date: "2023-10-01",
                end_date: "2024-09-30"
            }
        ],
        award_type_codes: [
            "A",
            "B",
            "C",
            "D"
        ]
    },
    fields: [
        "Award ID",
        "Recipient Name",
        "Start Date",
        "End Date",
        "Award Amount",
        "Total Outlays",
        "Description",
        "def_codes",
        "COVID-19 Obligations",
        "COVID-19 Outlays",
        "Infrastructure Obligations",
        "Infrastructure Outlays",
        "Awarding Agency",
        "Awarding Sub Agency",
        "Contract Award Type",
        "recipient_id",
        "prime_award_recipient_id"
    ],
    page: 1,
    limit: 60,
    sort: "Award Amount",
    order: "desc",
    subawards: false
};

function fetchAwardsTableData() {
    const promise = performSpendingByAwardSearch(paramsObj).promise.then(({ data }) => data);

    return wrapPromise(promise);
}

export default fetchAwardsTableData;
