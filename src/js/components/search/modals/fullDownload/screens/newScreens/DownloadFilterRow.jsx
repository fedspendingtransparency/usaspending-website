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
    console.debug("DOWNLOAD FILTER ROW: ", filter, filter.name === 'Place of Performance');
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


    // every filter value/name has a completely different format ( array of strings, array of objects, object, object of arrays), these have to be formatted before they
    // are passed into ReadMore because if you don't format it there is no comma separation
    let formatted = null;

    if (filter.name === 'Place of Performance' || filter.name === 'Recipient Location') {
        formatted = filter.values.map((filterTemp, i, row) => {
            if (i + 1 === row.length) {
                return `${filterTemp.display.entity}:  ${filterTemp.display.title}`;
            }
            return `${filterTemp.display.entity}:  ${filterTemp.display.title}, `;
        });
    }
    else if (filter.name === 'Awarding Agency' || filter.name === 'Funding Agency') {
        formatted = filter.values.map((filterTemp, i, row) => {
            if (i + 1 === row.length) {
                return `${filterTemp.toptier_agency.name} `;
            }
            return `${filterTemp.toptier_agency.name}, `;
        });
    }
    else if (filter.name === 'Award Amounts') {
        formatted = Object.entries(filter.values).map((filterTemp, i, row) => {
            if (i + 1 === row.length) {
                if (filterTemp[1][0] === null) {
                    return `${filterTemp[1][1]} and below`;
                }
                else if (filterTemp[1][1] === null) {
                    return `${filterTemp[1][0]} and above`;
                }

                return `${filterTemp[1][0]} - ${filterTemp[1][1]}`;
            }

            if (filterTemp[1][0] === null) {
                return `${filterTemp[1][1]} and below, `;
            }
            else if (filterTemp[1][1] === null) {
                return `${filterTemp[1][0]} and above, `;
            }

            return `${filterTemp[1][0]} - ${filterTemp[1][1]}, `;
        });
    }
    else if (filter.name === 'NAICS') {
        formatted = filter.values.map((filterTemp, i, row) => {
            if (i + 1 === row.length) {
                return `${filterTemp.label} `;
            }
            return `${filterTemp.label}, `;
        });
    }
    else if (filter.name === 'Treasury Account') {
        formatted = filter.values.map((filterTemp, i, row) => {
            if (i + 1 === row.length) {
                return `${filterTemp.label} `;
            }
            return `${filterTemp.label}, `;
        });
    }
    else if (filter.name === 'PSC') {
        formatted = filter.values.map((filterTemp, i, row) => {
            if (i + 1 === row.length) {
                return `${filterTemp.value} `;
            }
            return `${filterTemp.value}, `;
        });
    }
    else if (filter.name === 'Type of Contract Pricing' || 'Type of Set Aside') {
        formatted = Object.values(filter.values).join(", ");
    }

    // else {
    //     formatted = filter.values.join(", ");
    // }
    return (
        <tr>
            <th>{filter.name}:</th>
            <td ref={tdRef}>
                <ReadMore
                    text={formatted}
                    limit={limit}
                    openPrompt="Show all"
                    closePrompt="Show less" />
            </td>
        </tr>
    );
};

DownloadFilterRow.propTypes = propTypes;
export default DownloadFilterRow;
