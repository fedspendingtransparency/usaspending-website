import { performSpendingByGeographySearch } from "helpers/searchHelper";
import wrapPromise from "./wrapPromise";

// this is with only fy24 chosen from filters
const apiParamsObj =
    {
        scope: "place_of_performance",
        geo_layer: "state",
        geo_layer_filters: [
            "WI",
            "WA",
            "OR",
            "NE",
            "MI",
            "WY",
            "UT",
            "SD",
            "ND",
            "NV",
            "MT",
            "MN",
            "IA",
            "IL",
            "ID",
            "CO",
            "CA",
            "RI",
            "OH",
            "NY",
            "NH",
            "MA",
            "ME",
            "VT",
            "PA",
            "NJ",
            "IN",
            "CT",
            "TX",
            "TN",
            "MO",
            "LA",
            "OK",
            "NM",
            "MS",
            "KS",
            "AR",
            "AZ",
            "VA",
            "NC",
            "KY",
            "FL",
            "WV",
            "SC",
            "MD",
            "GA",
            "DC",
            "DE",
            "AL"
        ],
        filters: {
            time_period: [
                {
                    start_date: "2023-10-01",
                    end_date: "2024-09-30"
                }
            ]
        },
        subawards: false,
        auditTrail: "Map Visualization"
    };

function fetchSpendingByGeographyData() {
    const promise = performSpendingByGeographySearch(apiParamsObj).promise.then(({ data }) => data);

    return wrapPromise(promise);
}

export default fetchSpendingByGeographyData;
