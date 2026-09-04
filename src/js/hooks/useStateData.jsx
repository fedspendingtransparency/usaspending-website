/**
 * useStateData.jsx
 * Created on 9/3/26 Nick Torres
 */

import { useQuery } from "@tanstack/react-query";
import { fetchStateList } from "../helpers/mapHelper";

const useStateData = () => {
    const { data, isSuccess, isLoading, error } = useQuery({
        queryKey: ['fetchStateList'],
        queryFn: () => fetchStateList().promise,
        staleTime: Infinity,
        gcTime: Infinity
    })
    
    return {data, isSuccess, isLoading, error};
}

export const useStateList = () => {
    const { data } = useStateData();
    const { data: innerData = {} } = data || {};
    const { results } = innerData;
    return results;
}

// 01: AL
export const useStateFIPSByAbbreviation = () => {
    const results = useStateList();
    if (results) {
        const obj = {};
        results.forEach((element) => {
            obj[element.code] = element.fips;
        });
        return obj;
    }
};

// 01: ALABAMA
export const useStateNameByFipsId = () => {
    const results = useStateList();
    if (results) {
        const obj = {};
        results.forEach((element) => {
            obj[element.fips] = element.name;
        });
        return obj;
    }
};

// alabama: 01
export const useFipsIdByStateName = () => {
    const results = useStateList();
    if (results) {
        const obj = {};
        results.forEach((element) => {
            obj[element.name.toLowerCase()] = element.fips;
        });
        return obj;
    }
};

// alabama: al
export const useCodeByStateName = () => {
    const results = useStateList();
    if (results) {
        const obj = {};
        results.forEach((element) => {
            obj[element.name] = element.code;
        });
        return obj;
    }
};

// al: alabama
export const useStatebyCode = () => {
    const results = useStateList();
    if (results) {
        const obj = {};
        results.forEach((element) => {
            obj[element.code] = element.name;
        });
        return obj;
    }
};

export const useStateNameFromFips = (fips) => {
    const stateNameByFipsId = useStateNameByFipsId();
    if (stateNameByFipsId && fips && {}.hasOwnProperty.call(stateNameByFipsId, fips.toLowerCase())) {
        return stateNameByFipsId[fips.toLowerCase()];
    }
    return [];
};

export const useStateAbbreviationFromFips = (fips) => {
    const stateFIPSByAbbreviation = useStateFIPSByAbbreviation();
    if (stateFIPSByAbbreviation && fips) {
        const abbreviations = Object.values(stateFIPSByAbbreviation);
        const index = abbreviations.indexOf(fips);

        if (index !== -1) {
            const keys = Object.keys(stateFIPSByAbbreviation);
            return keys[index];
        }
    }
    return null;
};