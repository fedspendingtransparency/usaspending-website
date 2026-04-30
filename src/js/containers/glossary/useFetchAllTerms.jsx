/**
 * useFetchAllTerms.jsx
 * Created by Andrea Blackwell 04/20/26
 */

import { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { fetchAllTerms } from 'helpers/glossaryHelper';
import { Definition } from 'redux/reducers/glossary/glossaryReducer';

const useFetchAllTerms = () => {
    const [allTerms, setAllTerms] = useState(null);

    const {
        data, isSuccess, isLoading, error
    } = useQuery({
        queryKey: ['allGlossaryTerms'],
        queryFn: () => fetchAllTerms().promise,
        staleTime: 60000
    });

    useEffect(() => {
        if (data?.data?.results.length > 0) {
            setAllTerms(data?.data.results.map((result) => new Definition(result)));
        }
    }, [data]);


    return {
        allTerms, isSuccess, isLoading, error
    };
};

export default useFetchAllTerms;
