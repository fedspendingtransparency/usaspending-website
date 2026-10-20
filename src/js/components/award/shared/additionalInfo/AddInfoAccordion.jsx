/**
 * Accordion.jsx
 * Created by Kwadwo Opoku-Debrah 10/13/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { compact, uniqueId } from 'lodash-es';
import { Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TooltipWrapper } from 'data-transparency-ui';

import { CondensedCDTooltip } from 'components/award/shared/InfoTooltipContent';
import Accordion from '../../../sharedComponents/accordion/Accordion';

const awardIdField = 'Unique Award Key';

const propTypes = {
    accordionName: PropTypes.string,
    accordionIcon: PropTypes.string,
    iconClassName: PropTypes.string,
    accordionData: PropTypes.object
};

const AddInfoAccordion = ({
    accordionName,
    accordionIcon,
    iconClassName,
    accordionData
}) => {
    const link = (pathAndTitle) => {
        const { path, title } = pathAndTitle;
        if (!path && !title) return '--';
        if (!path) return title;
        if (title && path) return (<Link to={path}>{title}</Link>);
        return (<Link to={path}>Unknown</Link>);
    };

    // pass an array of address lines
    // e.g. ['1234 Sleepy Ghost Lane', 'Las Vegas, Nevada', 'Some Country']
    const address = (arrayOfRows) => {
        // if no data return --
        const array = compact(arrayOfRows);
        if (array.length === 0) return '--';
        return (
            <div>
                {
                    arrayOfRows.map((addressLine) => (
                        <div key={`addressline-${addressLine}-${uniqueId()}`}>
                            {addressLine || '--'}
                        </div>
                    ))
                }
            </div>
        );
    };

    // pass an array of data
    // e.g. ['have', 'a', 'good', 'day']
    const list = (arrayOfData) => {
        const array = compact(arrayOfData);
        if (array.length === 0) return '--';
        return (
            <ul className="accordion-table__list">
                {arrayOfData.map((type) => <li key={`list-${type}-${uniqueId()}`}>{type}</li>)}
            </ul>
        );
    };

    const accordionBody = () => {
        if (!accordionData) return null;

        return Object.keys(accordionData).map((key) => {
            let showCDTooltip = false;

            let data = accordionData[key] || '--';

            // display data as a link, address or list
            if (accordionData[key]) {
                const awardInfo = accordionData[key];
                const specialType = accordionData[key].type;

                if (specialType) {
                    const getData = () => {
                        switch (specialType) {
                            case 'list':
                                return list(awardInfo.data);
                            case 'address':
                                return address(awardInfo.data);
                            default:
                                return link(awardInfo.data);
                        }
                    };

                    data = getData();
                }

                if (
                    specialType === 'address' ||
                    key === 'Congressional District'
                ) showCDTooltip = true;
            }

            return (
                <div
                    key={key}
                    className="accordion-row">
                    <div className="accordion-row__title">{key}</div>
                    <div
                        className={`accordion-row__data${
                            key === awardIdField ? ' generated-id' : ''
                        }${
                            showCDTooltip ? ' show-tooltip' : ''
                        }`}>
                        <div className={`${open ? 'tab-enabled' : 'tab-disabled'}`}>
                            {data}
                        </div>
                        {(key === 'Congressional District' && open && showCDTooltip) && (
                            <div className="accordion-row__data-tooltip">
                                <TooltipWrapper
                                    className="homepage__covid-19-tt"
                                    icon="info"
                                    tooltipComponent={
                                        <CondensedCDTooltip title="Congressional District" />
                                    } />
                            </div>
                        )}
                    </div>
                </div>
            );
        });
    };

    const title = (
        <span>
            <FontAwesomeIcon className={iconClassName} size="lg" icon={accordionIcon} />
            {accordionName}
        </span>
    );

    return (
        <Accordion title={title} contentClassName="no-padding" containerClassName="expand-all-trigger">
            <div className="accordion__content">
                {accordionBody()}
            </div>
        </Accordion>
    );
};

AddInfoAccordion.propTypes = propTypes;
export default AddInfoAccordion;
