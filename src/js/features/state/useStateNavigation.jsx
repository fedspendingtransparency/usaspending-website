import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { useMatch, useNavigate } from "react-router";
import { parseStateDataFromUrl } from "./stateHelper";
import {resetState, setStateFiscalYear} from "../../redux/actions/state/stateActions";

export const useStateNavigation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const match = useMatch(`/state/:state/:fyParam?`);
    const { state, fyParam } = match.params;
    const [wasInputStateName, stateName, stateId] = parseStateDataFromUrl(state);
    const fy = fyParam;

    const handleFyChange = (newFy) => {
        navigate(`/state/${stateName}/${newFy}`);
        dispatch(setStateFiscalYear(newFy));
    };

    useEffect(() => {
        if (!fy) {
            // this may be an issue on the first day of 2026 fiscal year
            // history(`/state/${stateName}/latest`, { replace: true });
            navigate(`/state/${stateName}/2026`, { replace: true });
        }
        else if (!wasInputStateName) {
            navigate(`/state/${stateName}/${fy}`, { replace: true });
        }
        else {
            dispatch(setStateFiscalYear(fy));
        }

        return () => {
            dispatch(resetState());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { handleFyChange, state, stateId, fy };

};

export default useStateNavigation;