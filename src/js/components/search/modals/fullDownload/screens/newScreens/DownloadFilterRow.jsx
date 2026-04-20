/**
 * DownloadFilterRow.jsx
 * Created by JD House 3/20/26
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ReadMore from 'components/sharedComponents/ReadMore';

const propTypes = {
    filter: PropTypes.object
};

const DownloadFilterRow = ({
    filter
}) => {
    // depending on API structure/Redux state we should be able pull from Redux
    const [limit, setLimit] = useState(300);
    const tdRef = useRef(null);

    useEffect(() => {
        const checkOverflow = () => {
            const td = tdRef.current;
            if (td) {
                // account for 32px of padding
                const clientWidth = td.clientWidth - 32;
                const strWidth = filter.values.length;
                // approximate character length to px conversion
                const maxWidth = Math.floor(clientWidth / 9);

                if (strWidth > maxWidth) {
                    setLimit(maxWidth);
                }
            }
        };

        checkOverflow();
        window.addEventListener('resize', checkOverflow);
        return () => window.removeEventListener('resize', checkOverflow);
    }, [filter]);
    console.debug("FILTER: ", filter);
    return (
        <tr>
            <th>{filter.name}:</th>
            <td ref={tdRef}>
                <ReadMore
                    text={filter.values}
                    limit={limit}
                    openPrompt="Show all"
                    closePrompt="Show less" />
            </td>
        </tr>
    );
};

DownloadFilterRow.propTypes = propTypes;
export default DownloadFilterRow;
