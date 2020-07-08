/**
 * MoreOptionsTabs.jsx
 * Created by James Lee 6/18/20
 */

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import { Picker } from 'data-transparency-ui';
import { formatNumber } from 'accounting';
import ResultsTableTabs from '../../search/table/ResultsTableTabs';
import { getIndexesToDelete, adaptTabs, selectOptionDecision } from '../../../helpers/moreOptionsTabs/moreOptionsTabsHelper';

const propTypes = {
    tabs: PropTypes.array.isRequired,
    tabCounts: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    classes: PropTypes.string,
    pickerLabel: PropTypes.string,
    changeActiveTab: PropTypes.func
};

const MoreOptionsTabs = (props) => {
    const [activeTab, setActiveTab] = useState(props.tabs[0].internal);
    const [pickerActiveTab, setPickerActiveTab] = useState('');
    const [tabClass, setTabClass] = useState('');
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const [tabsContainerWidth, setTabsContainerWidth] = useState(null);
    const [pickerOptions, setPickerOptions] = useState([]);
    const [tabTypes, setTabTypes] = useState(props.tabs);
    const [indexesToDelete, setIndexesToDelete] = useState([]);
    const tabs = useRef(null);

    const filteredSelectedOption = pickerOptions.filter((option) => option.value === activeTab);
    const filteredSelectedPickerOption = pickerOptions.filter((option) => option.value === pickerActiveTab);

    const switchTab = (tab) => {
        pickerOptions.forEach((option) => {
            if (option.value === tab) {
                setPickerActiveTab(tab);
            }
        });
        setActiveTab(tab);

        // update subtitle based on tab selected
        if (props.changeActiveTab) {
            props.changeActiveTab(tab);
        }
    };

    const selectOption = (name, value) => (
        <div
            role="listbox"
            onChange={switchTab}
            onKeyDown={switchTab}
            title={`Show ${name}`}
            aria-label={`Show ${name} - ${props.tabCounts[value]} ${props.tabCounts[value] === 1 ? 'result' : 'results'}`}
            tabIndex={0}>
            <div className="tab-content">
                <div className="tab-label">
                    {name}
                </div>
                <div className={`count-badge ${value === activeTab ? 'active' : ''}`}>
                    {formatNumber(props.tabCounts[value])}
                </div>
            </div>
        </div>
    );

    const previewCountPropTypes = {
        name: PropTypes.string,
        value: PropTypes.string
    };

    const PreviewCount = ({ name, value }) => (
        <div>
            <div className="more-options__tabs_preview-label">{name}</div>
            <div className="more-options__tabs_preview-count">{formatNumber(props.tabCounts[value]) ? formatNumber(props.tabCounts[value]) : '0'}</div>
        </div>
    );
    PreviewCount.propTypes = previewCountPropTypes;

    useEffect(() => {
        const handleResize = () => {
            // reset everything
            if (tabs && tabs.current && tabs.current.offsetWidth) {
                setTabsContainerWidth(tabs.current.offsetWidth);
            }
            setTabTypes(props.tabs);
            setIndexesToDelete([]);
        };

        window.addEventListener('resize', throttle(handleResize, 100));
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setIndexesToDelete(getIndexesToDelete(tabs.current.children[0].children, props.tabs, tabs.current.offsetWidth, 190, setShowMoreOptions, setPickerOptions));
        // set class for when js is not available
        setTabClass('more-options__tabs_primary_js');
    }, [tabTypes, tabsContainerWidth]);

    useEffect(() => {
        adaptTabs(indexesToDelete, tabTypes, props.tabs, setShowMoreOptions, setTabTypes, setPickerOptions);
    }, [indexesToDelete]);

    return (
        <div className={`more-options__tabs more-options__tabs_primary ${tabClass} ${props.classes}`} ref={tabs}>
            <ResultsTableTabs
                types={tabTypes}
                active={activeTab}
                switchTab={switchTab}
                counts={props.tabCounts} />

            {showMoreOptions ?
                <Picker
                    id="more-options__tabs-picker"
                    className={`table-type-toggle ${filteredSelectedOption && filteredSelectedOption.length > 0 ? 'active' : ''}`}
                    icon=""
                    selectedOption={selectOptionDecision(filteredSelectedPickerOption, filteredSelectedOption, props.tabs, pickerOptions, activeTab, selectOption, props.pickerLabel)}
                    options={pickerOptions.length > 0 && pickerOptions.map((option) => ({
                        name: option.name,
                        value: option.value,
                        component: <PreviewCount name={option.name} value={option.value} />,
                        onClick: () => { switchTab(option.value); }
                    }))} />
                : null}
            {pickerOptions.length > 0 ? <div className="picker-tab-padding-right" /> : <div className="tabs-padding-right" />}
        </div>
    );
};

export default MoreOptionsTabs;
MoreOptionsTabs.propTypes = propTypes;
