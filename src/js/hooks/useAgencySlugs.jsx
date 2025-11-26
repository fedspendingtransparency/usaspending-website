import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { isEmpty } from "lodash-es";
import {
    mapIdToSlug,
    mapSlugToTopTierCode,
    mapTopTierCodeToOutlay,
    mapTopTierCodeToSlug
} from "../containers/agency/WithAgencySlugs";
import { fetchAgencySlugs } from "../apis/agency";
import { setAgencySlugs } from "../redux/actions/agency/agencyActions";


const useAgencySlugs = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { agencySlugs, topTierCodes, agencyIds } = useSelector((state) => state.agency);
    const request = useRef(null);

    useEffect(() => {
        if (!isEmpty(agencySlugs) && loading) {
            setLoading(false);
        }
        if (isEmpty(agencySlugs)) {
            setLoading(true);
            setError(false);
            request.current = fetchAgencySlugs();
            request.current.promise
                .then(({ data }) => {
                    const slugsMapping = mapSlugToTopTierCode(data.results);
                    const outlayMapping = mapTopTierCodeToOutlay(data.results);
                    const topTierCodesMapping = mapTopTierCodeToSlug(data.results);
                    const idMapping = mapIdToSlug(data.results);
                    dispatch(setAgencySlugs(
                        slugsMapping, topTierCodesMapping, idMapping, outlayMapping
                    ));
                    setLoading(false);
                    setError(false);
                    request.current = null;
                })
                .catch((e) => {
                    if (e.code !== 'ERR_CANCELED') {
                        setLoading(false);
                        setError(true);
                        console.error(e);
                        request.current = null;
                    }
                });
        }
        return () => {
            if (request.current) {
                request.current.cancel();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [agencySlugs, topTierCodes, agencyIds]);

    return [agencySlugs, topTierCodes, agencyIds, loading, error];
};

export default useAgencySlugs;
