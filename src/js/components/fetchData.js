import { fetchAllTerms } from "helpers/glossaryHelper";
import wrapPromise from "./wrapPromise";

function fetchData() {
    const promise = fetchAllTerms().promise.then(({ data }) => data);

    return wrapPromise(promise);
}

export default fetchData;
