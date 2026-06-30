/**
 * DownloadFilterRow.jsx
 * Created by JD House 3/20/26
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ReadMore from '../../../../../../components/sharedComponents/ReadMore';
import { awardTypeCodes } from '../../../../../../dataMapping/search/awardType';
import { recipientTypes } from '../../../../../../dataMapping/search/recipientType';
import { pricingTypeDefinitions, setAsideDefinitions, extentCompetedDefinitions } from '../../../../../../dataMapping/search/contractFields';
import { defCodes } from '../../../../../../dataMapping/search/defCodes';
import { formatMoneyWithPrecision } from '../../../../../../helpers/moneyFormatter';

const propTypes = {
    filter: PropTypes.object
};

const DownloadFilterRow = ({
    filter
}) => {
    // depending on API structure/Redux state we should be able pull from Redux
    const [limit, setLimit] = useState(115);
    let formatted = null;
    const tdRef = useRef(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const handleResize = () => {
        const newWidth = window.innerWidth;

        if (windowWidth !== newWidth) {
            setWindowWidth(newWidth);
        }
    };
    useEffect(() => {
        handleResize();
        const checkOverflow = () => {
            const td = tdRef.current;
            if (td) {
                // account for 32px of padding
                const clientWidth = td.clientWidth - 32;
                const strWidth = formatted.length;
                const maxWidth = Math.floor(clientWidth / 7.5);
                if (strWidth > maxWidth) {
                    setLimit(maxWidth);
                }
            }
        };

        checkOverflow();
        window.addEventListener('resize', checkOverflow);
        return () => window.removeEventListener('resize', checkOverflow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, windowWidth, formatted]);

    // every filter value/name has a completely different format ( array of strings, array of objects, object, object of arrays), these have to be formatted before they
    // are passed into ReadMore because if you don't format it there is no comma separation
    if (filter.name === 'Award Description') {
        formatted = filter.values;
    }
    else if (filter.name === 'Recipient Type') {
        formatted = filter.values.map((filterTemp, i, row) => {
            if (i + 1 === row.length) {
                return `${recipientTypes[filterTemp]}`;
            }

            return `${recipientTypes[filterTemp]},`;
        });
        formatted = formatted.join(" ");
    }
    else if (filter.name === 'Place of Performance' || filter.name === 'Recipient Location') {
        if (filter.scope === 'foreign') {
            formatted = "ALL FOREIGN LOCATIONS";
        }
        else if (filter.scope === 'all') {
            formatted = filter.values.map((filterTemp, i, row) => {
                if (i + 1 === row.length) {
                    return `${filterTemp.display.entity}:  ${filterTemp.display.title}`;
                }
                return `${filterTemp.display.entity}:  ${filterTemp.display.title},`;
            });
            formatted = formatted.join(" ");
        }
    }
    else if (filter.name === 'Disaster Emergency Fund Code (DEFC)') {
        formatted = filter.values.map((filterTemp, i, row) => {
            if (i + 1 === row.length) {
                return `${defCodes[filterTemp].title}`;
            }

            return `${defCodes[filterTemp].title},`;
        });
        formatted = formatted.join(" ");
    }
    else if (filter.name === 'Award Type') {
        formatted = filter.values.map((filterTemp, i, row) => {
            if (i + 1 === row.length) {
                return `${awardTypeCodes[filterTemp]}`;
            }

            return `${awardTypeCodes[filterTemp]},`;
        });
        formatted = formatted.join(" ");
    }
    else if (filter.name === 'Awarding Agency' || filter.name === 'Funding Agency') {
        formatted = filter.values.map((filterTemp, i, row) => {
            if (i + 1 === row.length) {
                return `${filterTemp.toptier_agency.name}`;
            }
            return `${filterTemp.toptier_agency.name},`;
        });
        formatted = formatted.join(" ");
    }
    else if (filter.name === 'Award Amount') {
        formatted = Object.entries(filter.values).map((filterTemp, i, row) => {
            if (i + 1 === row.length) {
                if (filterTemp[1][0] === null) {
                    return `${formatMoneyWithPrecision(filterTemp[1][1])} and below`;
                }
                else if (filterTemp[1][1] === null) {
                    return `${formatMoneyWithPrecision(filterTemp[1][0])} and above`;
                }

                return `${formatMoneyWithPrecision(filterTemp[1][0])} - ${formatMoneyWithPrecision(filterTemp[1][1])}`;
            }

            if (filterTemp[1][0] === null) {
                return `${formatMoneyWithPrecision(filterTemp[1][1])} and below,`;
            }
            else if (filterTemp[1][1] === null) {
                return `${formatMoneyWithPrecision(filterTemp[1][0])} and above,`;
            }

            return `${formatMoneyWithPrecision(filterTemp[1][0])} - ${formatMoneyWithPrecision(filterTemp[1][1])},`;
        });
        formatted = formatted.join(" ");
    }
    else if (filter.name === 'NAICS') {
        formatted = filter.values.map((filterTemp, i, row) => {
            if (i + 1 === row.length) {
                return `${filterTemp.identifier} - ${filterTemp.naics_description} `;
            }
            return `${filterTemp.identifier} - ${filterTemp.naics_description},`;
        });
        formatted = formatted.join(" ");
    }
    else if (filter.name === 'Treasury Account') {
        formatted = filter.values.map((filterTemp, i, row) => {
            if (i + 1 === row.length) {
                return `${filterTemp.tas_description} `;
            }
            return `${filterTemp.tas_description},`;
        });
        formatted = formatted.join(" ");
    }
    else if (filter.name === 'PSC') {
        formatted = filter.values.map((filterTemp, i, row) => {
            if (i + 1 === row.length) {
                return `${filterTemp.psc_description} `;
            }
            return `${filterTemp.psc_description},`;
        });
        formatted = formatted.join(" ");
    }
    else if (filter.name === 'Type of Contract Pricing') {
        formatted = Object.values(filter.values).map((filterTemp, i, row) => {
            if (i + 1 === row.length) {
                return `${pricingTypeDefinitions[filterTemp]}`;
            }

            return `${pricingTypeDefinitions[filterTemp]},`;
        });
        formatted = formatted.join(" ");
    }
    else if (filter.name === 'Type of Set Aside') {
        formatted = Object.values(filter.values).map((filterTemp, i, row) => {
            if (i + 1 === row.length) {
                return `${setAsideDefinitions[filterTemp]}`;
            }

            return `${setAsideDefinitions[filterTemp]},`;
        });
        formatted = formatted.join(" ");
    }
    else if (filter.name === 'Extent Competed') {
        formatted = Object.values(filter.values).map((filterTemp, i, row) => {
            if (i + 1 === row.length) {
                return `${extentCompetedDefinitions[filterTemp]}`;
            }

            return `${extentCompetedDefinitions[filterTemp]},`;
        });
        formatted = formatted.join(" ");
    }
    else if (filter.name === 'Assistance Listing') {
        formatted = filter.values.map((filterTemp, i, row) => {
            if (i + 1 === row.length) {
                return `${filterTemp.identifier} | ${filterTemp.program_title}`;
            }
            return `${filterTemp.identifier} | ${filterTemp.program_title},`;
        });
        formatted = formatted.join(" ");
    }
    else {
        formatted = filter.values.join(", ");
    }
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
