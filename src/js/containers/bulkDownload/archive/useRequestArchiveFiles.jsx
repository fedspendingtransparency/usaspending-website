/**
 * useRequestArchiveFiles.jsx
 * Created by Josue Aguilar 7/7/26
 */

import { useQuery } from "@tanstack/react-query";
import { requestArchiveFiles } from "-helpers/bulkDownloadHelper";

const useRequestArchiveFiles = (id, fy, type) => {

    const { data } = useQuery({
        queryKey: ['requestArchiveFiles', id, fy, type],
        queryFn: () => requestArchiveFiles({
            agency: id,
            fiscal_year: fy,
            type
        }).promise,
        staleTime: Infinity,
        refetchOnWindowFocus: false
    })

    return data?.data?.monthly_files || [];
}

export default useRequestArchiveFiles;
