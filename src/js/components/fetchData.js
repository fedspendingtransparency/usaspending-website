// import { fetchAllTerms } from "helpers/glossaryHelper";
import wrapPromise from "./wrapPromise";
import { fetchAllAgencies } from "../helpers/agencyLandingHelper";

function fetchData() {
    // const promise = fetchAllTerms().promise.then(({ data }) => data);
    const promise = fetchAllAgencies().promise.then(({ data }) => data);

    return wrapPromise(promise);
}

export default fetchData;
