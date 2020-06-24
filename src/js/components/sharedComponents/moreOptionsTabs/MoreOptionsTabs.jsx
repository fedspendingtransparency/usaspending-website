import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import { formatNumber } from 'accounting';
import { Picker } from 'data-transparency-ui';
import ResultsTableTabs from '../../search/table/ResultsTableTabs';

const propTypes = {
    tabs: PropTypes.array.isRequired,
    tabCounts: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    classes: PropTypes.string.isOptional
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

    const switchTab = (tab) => {
        pickerOptions.forEach((option) => {
            if (option.value === tab) {
                setPickerActiveTab(tab);
            }
        });
        setActiveTab(tab);
    };

    const filteredSelectedOption = pickerOptions.filter((option) => option.value === activeTab);
    const filteredSelectedPickerOption = pickerOptions.filter((option) => option.value === pickerActiveTab);

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

    const getIndexesToDelete = (allTabs, containerWidth, moreOptionsWidth) => {
        setTabsContainerWidth(containerWidth);
        if (tabsContainerWidth) {
            let stopWidth = moreOptionsWidth;
            const indexes = [];

            // grab the indexes of tabs to delete
            allTabs.forEach((_, i) => {
                const width = allTabs[i].offsetWidth;
                if (width === 0) {
                    setShowMoreOptions(true);
                    setPickerOptions(props.tabs.map((col) => ({
                        name: col.label,
                        value: col.internal
                    })));
                }

                if (width > 0 && Array.from(allTabs).length === props.tabs.length) {
                    setShowMoreOptions(false);
                }

                if (tabsContainerWidth >= (stopWidth + width)) {
                    stopWidth += width;
                } else {
                    indexes.push(i);
                }
            });

            if (indexes.length > 0) {
                // remove an extra element for buffer so columns don't overflow off the page
                const minIndex = Math.min(...indexes);
                indexes.push(minIndex - 1);

                // set the tabs to delete off the screen
                setIndexesToDelete(indexes);
            }
        }
    };

    const adaptTabs = () => {
        // if we have indexes to delete we want to delete them and add them to the picker options
        if (indexesToDelete && indexesToDelete.length > 0) {
            setShowMoreOptions(true);
            if (tabTypes.length - indexesToDelete.length <= 0) {
                // if we have a negative difference or a difference equaling zero, we can remove the last tab and just set the picker options to all options
                setTabTypes(tabTypes.slice(0, 0));
                setPickerOptions(props.tabs.map((col) => ({
                    name: col.label,
                    value: col.internal
                })));
            } else {
                // remove tabs and add the removed tabs to picker options dropdown
                setTabTypes(tabTypes.slice(0, tabTypes.length - indexesToDelete.length));
                setPickerOptions(tabTypes.slice(tabTypes.length - indexesToDelete.length, tabTypes.length).map((col) => ({
                    name: col.label,
                    value: col.internal
                })));
            }
        }
    };

    const selectOptionDecision = () => {
        if (filteredSelectedPickerOption && filteredSelectedPickerOption.length > 0 && pickerOptions.length !== props.tabs.length) {
            // if picker options contains the active tab then show the active tab as selected in the picker
            const foundActiveTab = pickerOptions.filter((option) => option.value === activeTab);
            if (foundActiveTab && foundActiveTab.length > 0) {
                return selectOption(foundActiveTab[0].name, foundActiveTab[0].value);
            }
        } else if (filteredSelectedOption && filteredSelectedOption.length > 0 && pickerOptions.length !== props.tabs.length) {
            return selectOption(filteredSelectedOption[0].name, filteredSelectedOption[0].value);
        } else if (filteredSelectedOption && filteredSelectedOption.length > 0 && pickerOptions.length > 0 && pickerOptions.length === props.tabs.length) {
            if (pickerOptions[0] && pickerOptions[0].value === activeTab) {
                return selectOption(pickerOptions[0].name, pickerOptions[0].value);
            }
            return selectOption(filteredSelectedOption[0].name, filteredSelectedOption[0].value);
        }
        return 'More Options';
    };

    const previewCountPropTypes = {
        name: PropTypes.string,
        value: PropTypes.string
    };

    const PreviewCount = ({ name, value }) => (
        <div>
            <div className="more-options__tabs_preview-label">{name}</div>
            <div className="more-options__tabs_preview-count">{props.tabCounts[value] ? props.tabCounts[value] : '0'}</div>
        </div>
    );
    PreviewCount.propTypes = previewCountPropTypes;

    useEffect(() => {
        const handleResize = () => {
            // reset everything
            setTabsContainerWidth(tabs.current.offsetWidth);
            setTabTypes(props.tabs);
            setIndexesToDelete([]);
        };

        window.addEventListener('resize', throttle(handleResize, 100));
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        getIndexesToDelete(tabs.current.children[0].children, tabs.current.offsetWidth, 200);
        // set class for when js is not available
        setTabClass('more-options__tabs_primary_js');
    }, [tabTypes, tabsContainerWidth]);

    useEffect(() => {
        adaptTabs();
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
                    selectedOption={selectOptionDecision()}
                    options={pickerOptions.length > 0 && pickerOptions.map((option) => ({
                        name: option.name,
                        value: option.value,
                        component: <PreviewCount name={option.name} value={option.value} />,
                        onClick: () => { switchTab(option.value); }
                    }))} />
                : null}
            {pickerOptions.length > 0 && pickerOptions.length === props.tabs.length ? '' : <div className="tab-padding-right" />}
        </div>
    );
};

export default MoreOptionsTabs;
MoreOptionsTabs.propTypes = propTypes;
