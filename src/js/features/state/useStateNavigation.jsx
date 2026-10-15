import { useEffect, useCallback } from "react";
import { useDispatch } from 'react-redux';
import { useMatch, useNavigate } from "react-router";
import { parseStateDataFromUrl } from "./stateHelper";
import { resetState, setStateFiscalYear } from "../../redux/actions/state/stateActions";
import { allFiscalYears } from "../../helpers/fiscalYearHelper";
import { useFipsIdByStateName, useStateNameByFipsId } from "../../hooks/useStateData";

export const useStateNavigation = () => {
    const fipsIdByStateName = useFipsIdByStateName();
    const stateNameByFipsId = useStateNameByFipsId();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const match = useMatch(`/state/:state/:fyParam?`);
    const { state, fyParam } = match.params;
    const [wasInputStateName, stateName, stateId] = parseStateDataFromUrl(state, fipsIdByStateName, stateNameByFipsId);
    const fy = fyParam;
    // fipsIdByStateName is rebuilt into a new object on every render, so use a stable
    // primitive to detect "data has loaded" without re-running the effect every render
    const isStateDataLoaded = !!fipsIdByStateName;

    const handleFyChange = useCallback((newFy) => {
        navigate(`/state/${stateName}/${newFy}`);
        dispatch(setStateFiscalYear(newFy));
    }, [dispatch, navigate, stateName]);

    useEffect(() => {
        // state list hasn't loaded yet; wait rather than redirecting away prematurely
        if (!fipsIdByStateName) {
            return undefined;
        }

        if (Object.keys(fipsIdByStateName).includes(stateName?.replaceAll('-', ' '))) {
            if (!fy) {
                // this may be an issue on the first day of 2026 fiscal year
                // history(`/state/${stateName}/latest`, { replace: true });
                navigate(`/state/${stateName}/2026`, { replace: true });
            }
            else if (!allFiscalYears().includes(parseInt(fyParam, 10))) {
                navigate(`/state/${stateName}/2026`, { replace: true} );
            }
            else if (!wasInputStateName) {
                navigate(`/state/${stateName}/${fy}`, { replace: true });
            }
            else {
                dispatch(setStateFiscalYear(fy));
            }
        }
        else {
            navigate(`/state`);
        }

        return () => {
            dispatch(resetState());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isStateDataLoaded]);

    return { handleFyChange, state, stateId, fy };

};

export default useStateNavigation;