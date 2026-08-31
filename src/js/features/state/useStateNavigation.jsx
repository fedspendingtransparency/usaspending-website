import { useEffect, useCallback } from "react";
import { useDispatch } from 'react-redux';
import { useMatch, useNavigate } from "react-router";
import { parseStateDataFromUrl } from "./stateHelper";
import { resetState, setStateFiscalYear } from "../../redux/actions/state/stateActions";
import { fipsIdByStateName } from "../../dataMapping/state/stateNames";
import { allFiscalYears } from "../../helpers/fiscalYearHelper";

export const useStateNavigation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const match = useMatch(`/state/:state/:fyParam?`);
    const { state, fyParam } = match.params;
    const [wasInputStateName, stateName, stateId] = parseStateDataFromUrl(state);
    const fy = fyParam;

    const handleFyChange = useCallback((newFy) => {
        navigate(`/state/${stateName}/${newFy}`);
        dispatch(setStateFiscalYear(newFy));
    }, [dispatch, navigate, stateName]);

    useEffect(() => {
        if (Object.keys(fipsIdByStateName).includes(stateName.replaceAll('-', ' '))) {
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
    }, []);

    return { handleFyChange, state, stateId, fy };

};

export default useStateNavigation;