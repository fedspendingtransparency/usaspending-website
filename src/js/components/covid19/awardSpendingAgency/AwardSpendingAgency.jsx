/**
 * AwardSpending.jsx
 * Created by James Lee 6/18/20
 */

import React, { useState, useEffect, useRef } from 'react';
import { formatNumber } from 'accounting';
import { throttle } from 'lodash';
import DateNote from 'components/covid19/DateNote';
import { Picker } from 'data-transparency-ui';
import ResultsTableTabs from '../../search/table/ResultsTableTabs';
import { awardSpendingAgencyTableColumns } from '../../../dataMapping/covid19/awardSpendingAgency/awardSpendingAgencyTableColumns';


const AwardSpendingAgency = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [tabClass, setTabClass] = useState('');
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const tabs = useRef(null);
    const [tabsContainerWidth, setTabsContainerWidth] = useState(null);
    const [pickerOptions, setPickerOptions] = useState([]);
    const [tabTypes, setTabTypes] = useState(awardSpendingAgencyTableColumns);
    const [indexesToDelete, setIndexesToDelete] = useState([]);
    const [initialRender, setInitialRender] = useState(false);

    // TODO - Remove hard coded values
    const fy = 2020;
    const dateString = "June 30, 2020";

    const switchTab = (tab) => {
        setActiveTab(tab);
    };

    const mockCounts = {
        all: 123123123,
        contracts: 2856942,
        idvs: 65718,
        grants: 262180,
        direct_payments: 3173522,
        loans: 955562,
        insurance: 123,
        otherOption: 123123,
        otherOption1: 123123123,
        otherOption2: 123123123123
    };

    const filteredSelectedOption = pickerOptions.filter((option) => option.value === activeTab);

    const dropdownOptions = (name, value) => (
        <div
            role="listbox"
            onChange={switchTab}
            onKeyDown={switchTab}
            title={`Show ${name}`}
            aria-label={`Show ${name} - ${mockCounts[value]} ${mockCounts[value] === 1 ? 'result' : 'results'}`}
            tabIndex={0}>
            <div className="tab-content">
                <div className="tab-label">
                    {name}
                </div>
                <div className={`count-badge ${value === activeTab ? 'active' : ''}`}>
                    {formatNumber(mockCounts[value])}
                </div>
            </div>
        </div>
    );

    const getIndexesToDelete = () => {
        // stopWidth is initialized to roughly 2x the width of the 'More Options' dropdown
        let stopWidth = 200;
        setTabsContainerWidth(tabs.current.offsetWidth);

        if (tabsContainerWidth) {
            // grab the indexes of tabs to delete
            const indexes = [];
            tabTypes.forEach((tab, i) => {
                const width = tabs.current.children[0].children[i].offsetWidth;
                if (width === 0) {
                    setShowMoreOptions(true);
                    setPickerOptions(awardSpendingAgencyTableColumns.map((col) => ({
                        name: col.label,
                        value: col.internal
                    })));
                } else if (tabsContainerWidth >= stopWidth + width) {
                    stopWidth += width;
                } else {
                    indexes.push(i);
                }
            });
            if (indexes.length > 1) {
                setIndexesToDelete(indexes);
            }
        }
    };

    const adaptTabs = () => {
        if (indexesToDelete.length > 0) {
            setShowMoreOptions(true);
            if (tabTypes.length - indexesToDelete.length <= 0) {
                setTabTypes(tabTypes.slice(0, 0));
                setPickerOptions(awardSpendingAgencyTableColumns.map((col) => ({
                    name: col.label,
                    value: col.internal
                })));
            } else {
                setTabTypes(tabTypes.slice(0, tabTypes.length - indexesToDelete.length));
                setPickerOptions(tabTypes.slice(tabTypes.length - indexesToDelete.length, tabTypes.length).map((col) => ({
                    name: col.label,
                    value: col.internal
                })));
            }
        } else {
            setShowMoreOptions(true);
        }
    };


    useEffect(() => {
        const handleResize = () => {
            // reset everything
            setTabsContainerWidth(tabs.current.offsetWidth);
            setTabTypes(awardSpendingAgencyTableColumns);
            setIndexesToDelete([]);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        getIndexesToDelete();
        // set class for when js is not available
        setTabClass('award-spending__tabs_primary_js');
    }, [tabTypes, tabsContainerWidth]);

    useEffect(() => {
        adaptTabs();
    }, [indexesToDelete]);


    return (
        <div className="body__content award-spending">
            <DateNote dateString={dateString} />
            <h3 className="body__narrative">This is how the <strong>total spending</strong> of the COVID-19 Response was categorized.</h3>
            <p className="body__narrative-description">
                The total federal spending for the COVID-19 Response can be divided into different budget categories, including the different agencies that spent funds, the Federal Spending bills and Federal Accounts that funded the Response, and the different types of items and services that were purchased.
            </p>


            <div className={`award-spending__tabs award-spending__tabs_primary ${tabClass}`} ref={tabs}>
                <ResultsTableTabs
                    types={tabTypes}
                    active={activeTab}
                    switchTab={switchTab}
                    counts={mockCounts} />

                {showMoreOptions ?
                    <Picker
                        className={`table-type-toggle ${filteredSelectedOption && filteredSelectedOption.length > 0 ? 'active' : ''}`}
                        icon=""
                        selectedOption={filteredSelectedOption && filteredSelectedOption.length > 0 ? dropdownOptions(filteredSelectedOption[0].name, filteredSelectedOption[0].value) : 'More Options'}
                        options={pickerOptions.map((option) => ({
                            name: option.name,
                            value: option.value,
                            onClick: switchTab
                        }))} />
                    : null}
            </div>
            <div className="award-spending__content" />
        </div>
    );
};

export default AwardSpendingAgency;
